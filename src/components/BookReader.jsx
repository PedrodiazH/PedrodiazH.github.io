import { useCallback, useEffect, useRef, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

const COVER_PAD = 16
const SPINE = 8
const CHROME = COVER_PAD * 2 + SPINE + 24
const CLOSED_HOLD = 2400
const OPEN_DURATION = 1600
const SERIF = "Georgia, 'Times New Roman', serif"

const coverBackground = `
  radial-gradient(ellipse at 30% 20%, rgba(255,225,180,0.10) 0%, transparent 55%),
  repeating-linear-gradient(112deg, rgba(0,0,0,0.05) 0 2px, transparent 2px 5px),
  linear-gradient(145deg, #6b4530 0%, #4e3020 45%, #3a2116 75%, #2b170f 100%)
`

export default function BookReader({ url, title, author, caption, onClose }) {
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const docRef = useRef(null)
  const renderRef = useRef(null)
  const aspectRef = useRef(null)
  const [size, setSize] = useState(null)
  const [numPages, setNumPages] = useState(0)
  const [page, setPage] = useState(1)
  const [phase, setPhase] = useState('loading')
  const [failed, setFailed] = useState(false)

  const isClosed = phase === 'loading' || phase === 'closed'

  useEffect(() => {
    let cancelled = false
    pdfjsLib.getDocument(url).promise
      .then(async doc => {
        if (cancelled) {
          doc.destroy()
          return
        }
        docRef.current = doc
        const first = await doc.getPage(1)
        const base = first.getViewport({ scale: 1 })
        aspectRef.current = base.width / base.height
        if (!cancelled) setNumPages(doc.numPages)
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })

    return () => {
      cancelled = true
      renderRef.current?.cancel()
      docRef.current?.destroy()
      docRef.current = null
    }
  }, [url])

  useEffect(() => {
    if (!numPages) return
    const stage = stageRef.current
    if (!stage) return

    const observer = new ResizeObserver(() => {
      const aspect = aspectRef.current
      if (!aspect) return
      const availHeight = Math.max(260, stage.clientHeight - CHROME)
      const availWidth = Math.max(220, stage.clientWidth - CHROME)
      const height = Math.min(availHeight, availWidth / aspect)
      setSize({ width: Math.round(height * aspect), height: Math.round(height) })
    })
    observer.observe(stage)
    return () => observer.disconnect()
  }, [numPages])

  const draw = useCallback(async (target, pageNumber) => {
    const doc = docRef.current
    const canvas = canvasRef.current
    if (!doc || !canvas) return

    const pdfPage = await doc.getPage(pageNumber)
    if (docRef.current !== doc) return

    const base = pdfPage.getViewport({ scale: 1 })
    const dpr = Math.min(window.devicePixelRatio || 1, 3)
    const viewport = pdfPage.getViewport({ scale: (target.width * dpr) / base.width })

    renderRef.current?.cancel()
    canvas.width = Math.round(viewport.width)
    canvas.height = Math.round(viewport.height)
    canvas.style.width = `${target.width}px`
    canvas.style.height = `${target.height}px`

    const task = pdfPage.render({ canvasContext: canvas.getContext('2d'), viewport })
    renderRef.current = task
    try {
      await task.promise
    } catch {
      // render cancelado por un resize o un cambio de página
    }
  }, [])

  useEffect(() => {
    if (!size) return
    const frame = requestAnimationFrame(() => draw(size, page))
    return () => cancelAnimationFrame(frame)
  }, [size, page, draw])

  useEffect(() => {
    if (!size || phase !== 'loading') return
    const timer = setTimeout(() => setPhase('closed'), 80)
    return () => clearTimeout(timer)
  }, [size, phase])

  useEffect(() => {
    if (phase !== 'closed') return
    const timer = setTimeout(() => setPhase('opening'), CLOSED_HOLD)
    return () => clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'opening') return
    const timer = setTimeout(() => setPhase('open'), OPEN_DURATION)
    return () => clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setPage(p => Math.min(numPages || 1, p + 1))
      if (e.key === 'ArrowLeft') setPage(p => Math.max(1, p - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [numPages, onClose])

  const sceneWidth = size ? size.width + COVER_PAD * 2 + SPINE : 0
  const sceneHeight = size ? size.height + COVER_PAD * 2 : 0

  return (
    <div
      className="fixed inset-0 z-[2000] flex flex-col"
      style={{ background: 'radial-gradient(ellipse at 50% 35%, rgba(45,32,22,0.96) 0%, rgba(9,7,5,0.985) 70%)' }}
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4 shrink-0">
        <div
          className="flex items-center gap-2.5"
          style={{ opacity: phase === 'open' ? 1 : 0, transition: 'opacity 0.8s ease' }}
        >
          <i className="fas fa-feather-alt text-[11px]" style={{ color: '#a8895c' }}></i>
          <span className="text-[10px] md:text-[11px] tracking-[0.28em] uppercase font-medium" style={{ color: '#a8895c' }}>
            {title}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer hover:bg-white/[0.06]"
          aria-label="Cerrar"
        >
          <i className="fas fa-times text-xs" style={{ color: '#a8895c' }}></i>
        </button>
      </div>

      <div className="flex-1 min-h-0 flex px-3 pb-4 md:px-10 md:pb-8" onClick={(e) => e.stopPropagation()}>
        <div ref={stageRef} className="flex-1 min-h-0 flex items-center justify-center" style={{ perspective: '2600px' }}>
          {size && (
            <div
              className="relative"
              style={{
                width: `${sceneWidth}px`,
                height: `${sceneHeight}px`,
                transformStyle: 'preserve-3d',
                opacity: phase === 'loading' ? 0 : 1,
                transition: 'opacity 0.7s ease'
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  borderRadius: '4px 10px 10px 4px',
                  background: coverBackground,
                  boxShadow: '0 34px 80px rgba(0,0,0,0.72), inset 0 0 0 1px rgba(198,167,120,0.18), inset 0 0 50px rgba(0,0,0,0.4)'
                }}
              />

              <div
                className="absolute"
                style={{
                  left: `${COVER_PAD + SPINE}px`,
                  top: `${COVER_PAD}px`,
                  width: `${size.width}px`,
                  height: `${size.height}px`,
                  background: 'linear-gradient(165deg, #fdf8ea 0%, #f7efda 45%, #efe3c6 100%)',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.4), inset -2px 0 6px rgba(139,105,58,0.06)',
                  zIndex: 1
                }}
              >
                <canvas ref={canvasRef} className="block" />

                <div
                  className="absolute inset-0"
                  style={{
                    pointerEvents: 'none',
                    background: 'linear-gradient(to right, rgba(112,80,40,0.20) 0%, rgba(112,80,40,0.04) 5%, transparent 12%), linear-gradient(to left, rgba(112,80,40,0.07) 0%, transparent 8%)'
                  }}
                />

                <div
                  className="absolute"
                  style={{
                    right: '-5px',
                    top: '3px',
                    bottom: '3px',
                    width: '5px',
                    borderRadius: '0 2px 2px 0',
                    background: 'repeating-linear-gradient(to right, rgba(247,239,218,0.9) 0 1px, rgba(150,124,88,0.45) 1px 2px)'
                  }}
                />

                {failed && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center">
                    <span className="text-[11px]" style={{ color: '#6b5a3e' }}>
                      No se pudo abrir el microrrelato.
                    </span>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-medium underline"
                      style={{ color: '#8a6b3c' }}
                    >
                      Abrirlo en otra pestaña
                    </a>
                  </div>
                )}
              </div>

              <div
                className="absolute inset-0 overflow-hidden"
                onClick={() => phase === 'closed' && setPhase('opening')}
                style={{
                  zIndex: 3,
                  borderRadius: '4px 10px 10px 4px',
                  background: coverBackground,
                  boxShadow: isClosed
                    ? '0 34px 80px rgba(0,0,0,0.72), inset 0 0 0 1px rgba(198,167,120,0.25), inset -14px 0 26px rgba(0,0,0,0.4)'
                    : '0 34px 80px rgba(0,0,0,0.5)',
                  transformOrigin: 'left center',
                  transform: isClosed ? 'rotateY(0deg)' : 'rotateY(-158deg)',
                  opacity: isClosed ? 1 : 0,
                  transition: `transform ${OPEN_DURATION}ms cubic-bezier(0.62, 0.05, 0.3, 1), opacity ${Math.round(OPEN_DURATION * 0.45)}ms ease-in ${Math.round(OPEN_DURATION * 0.5)}ms`,
                  pointerEvents: phase === 'closed' ? 'auto' : 'none',
                  cursor: phase === 'closed' ? 'pointer' : 'default'
                }}
              >
                <div
                  className="absolute"
                  style={{
                    left: `${SPINE + 4}px`,
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    background: 'linear-gradient(to bottom, transparent, rgba(198,167,120,0.28) 15%, rgba(198,167,120,0.28) 85%, transparent)'
                  }}
                />

                <div className="h-full flex flex-col items-center justify-center text-center px-7 md:px-10 py-8 md:py-12">
                  <div
                    style={{ width: '46%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(214,183,127,0.55), transparent)' }}
                  />
                  <h2
                    className="my-5 md:my-7 text-[26px] md:text-[40px] leading-tight"
                    style={{
                      fontFamily: SERIF,
                      color: '#e9d3a4',
                      letterSpacing: '0.03em',
                      textShadow: '0 1px 0 rgba(0,0,0,0.55), 0 0 22px rgba(214,183,127,0.16)'
                    }}
                  >
                    {title}
                  </h2>
                  <div
                    style={{ width: '46%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(214,183,127,0.55), transparent)' }}
                  />
                  {author && (
                    <p
                      className="mt-6 md:mt-8 text-[13px] md:text-[16px]"
                      style={{ fontFamily: SERIF, color: 'rgba(214,183,127,0.85)', letterSpacing: '0.16em' }}
                    >
                      {author}
                    </p>
                  )}
                  {caption && (
                    <p
                      className="mt-7 md:mt-9 text-[9.5px] md:text-[11px] leading-relaxed max-w-[86%]"
                      style={{ fontFamily: SERIF, color: 'rgba(200,170,120,0.5)', fontStyle: 'italic' }}
                    >
                      {caption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {numPages > 1 && (
        <div
          className="flex items-center justify-center gap-5 pb-5 shrink-0"
          onClick={(e) => e.stopPropagation()}
          style={{ opacity: phase === 'open' ? 1 : 0, transition: 'opacity 0.8s ease', pointerEvents: phase === 'open' ? 'auto' : 'none' }}
        >
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="text-sm transition-opacity cursor-pointer disabled:opacity-25 disabled:cursor-default"
            style={{ color: '#a8895c' }}
            aria-label="Página anterior"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <span className="text-[10px] font-mono tracking-widest" style={{ color: '#8a7355' }}>
            {page} / {numPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(numPages, p + 1))}
            disabled={page === numPages}
            className="text-sm transition-opacity cursor-pointer disabled:opacity-25 disabled:cursor-default"
            style={{ color: '#a8895c' }}
            aria-label="Página siguiente"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  )
}

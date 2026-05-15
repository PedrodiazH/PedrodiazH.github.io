import { useEffect, useState } from 'react'
import { otros } from '../data/otros'
import BackButton from '../components/BackButton'
import PageHeader from '../components/PageHeader'

export default function Otros() {
  const [isVisible, setIsVisible] = useState(false)
  const [bookUrl, setBookUrl] = useState(null)
  const [scale, setScale] = useState(1.6)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="min-h-screen p-4 md:p-8 pb-24">
      <PageHeader />
      <BackButton />

      <div className="max-w-6xl mx-auto pt-20 md:pt-28">
        <div
          className="mb-8 md:mb-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.2s'
          }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Otras cositas</h2>
          <p className="text-gray-500 text-sm font-light">Proyectos y trabajos más allá de la ingeniería (o no)</p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.3s'
          }}
        >
          {otros.map((item, index) => (
            <div
              key={item.id}
              className="glass-card rounded-xl overflow-hidden group flex flex-col"
              style={{
                transitionDelay: `${(index * 0.08) + 0.3}s`
              }}
            >
              {item.image && (
                <div className="relative h-28 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
              )}
              <div className="p-4 flex flex-col flex-1 z-10 gap-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400/15 to-amber-600/10 flex items-center justify-center ring-1 ring-amber-400/20 shrink-0">
                      <i className={`fas ${item.icon} text-amber-400 text-[10px]`}></i>
                    </div>
                    <span className="text-gray-500 text-[10px] font-mono">{item.year}</span>
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-white leading-snug">{item.title}</h3>

                <p className="text-[11px] text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description }} />

                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-white/[0.03] border border-white/[0.06] rounded-full text-[9px] font-medium text-gray-500">{tag}</span>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 mt-auto border-t border-white/[0.04]">
                  {item.links.map((link, i) =>
                    link.locked ? (
                      <span key={i} className="text-gray-600 flex items-center gap-1 text-[10px] font-medium cursor-not-allowed">
                        <i className="fas fa-lock text-[8px]"></i>
                        {link.label}
                      </span>
                    ) : link.url.endsWith('.pdf') ? (
                      <button
                        key={i}
                        onClick={() => setBookUrl(link.url)}
                        className="text-amber-400/70 hover:text-amber-300 transition-all flex items-center gap-1 text-[10px] font-medium group/link cursor-pointer"
                      >
                        {link.label}
                        <i className="fas fa-book-open text-[8px] group-hover/link:translate-x-0.5 transition-transform"></i>
                      </button>
                    ) : (
                      <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="text-amber-400/70 hover:text-amber-300 transition-all flex items-center gap-1 text-[10px] font-medium group/link">
                        {link.label}
                        <i className="fas fa-arrow-right text-[8px] group-hover/link:translate-x-0.5 transition-transform"></i>
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {bookUrl && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-3 md:p-6"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
          onClick={() => { setBookUrl(null); setScale(1.6) }}
        >
          <div
            className="relative w-full max-w-5xl h-[90vh] flex flex-col rounded-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(180deg, #3e2723 0%, #4e342e 15%, #5d4037 50%, #4e342e 85%, #3e2723 100%)',
              boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 0 2px #8d6e63, 0 0 0 5px #3e2723, inset 0 0 60px rgba(0,0,0,0.3)',
            }}
          >
            <div className="flex items-center justify-between px-4 py-2.5" style={{ background: 'rgba(0,0,0,0.2)' }}>
              <div className="flex items-center gap-2.5">
                <div style={{
                  width: '20px', height: '20px',
                  background: 'linear-gradient(135deg, #8d6e63, #a1887f)',
                  borderRadius: '2px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1)'
                }}>
                  <i className="fas fa-feather-alt text-[10px]" style={{ color: '#3e2723' }}></i>
                </div>
                <span className="text-amber-700/80 text-[10px] font-medium tracking-widest uppercase">Microrrelato</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setScale(s => Math.max(0.5, s - 0.2))}
                  className="text-amber-700/50 hover:text-amber-600/70 transition-colors text-xs cursor-pointer"
                >
                  <i className="fas fa-search-minus"></i>
                </button>
                <span className="text-amber-700/40 text-[10px] font-mono w-8 text-center">{Math.round(scale * 100)}%</span>
                <button
                  onClick={() => setScale(s => Math.min(2.5, s + 0.2))}
                  className="text-amber-700/50 hover:text-amber-600/70 transition-colors text-xs cursor-pointer"
                >
                  <i className="fas fa-search-plus"></i>
                </button>
                <span className="w-px h-4 mx-1" style={{ background: 'rgba(255,255,255,0.08)' }}></span>
                <button
                  onClick={() => { setBookUrl(null); setScale(1.6) }}
                  className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <i className="fas fa-times text-amber-700/60 text-[10px]"></i>
                </button>
              </div>
            </div>

            <div className="flex-1 relative m-2 md:m-4 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #f5e6c8 0%, #faf3e6 30%, #f0e0c0 70%, #e8d5a8 100%)',
                boxShadow: 'inset 0 0 50px rgba(139, 90, 43, 0.15), 0 1px 4px rgba(0,0,0,0.2)'
              }}
            >
              <div style={{
                position: 'absolute',
                left: '50%',
                top: '5%',
                bottom: '5%',
                width: '2px',
                background: 'linear-gradient(to bottom, transparent, rgba(139, 90, 43, 0.12) 20%, rgba(139, 90, 43, 0.12) 80%, transparent)',
                transform: 'translateX(-50%)',
                zIndex: 2,
                pointerEvents: 'none'
              }} />

              <div className="w-full h-full overflow-auto flex items-start justify-center">
                <div style={{ transform: `scale(${scale})`, transformOrigin: 'center top', transition: 'transform 0.2s ease' }}>
                  <iframe
                    src={`${bookUrl}#toolbar=0&navpanes=0`}
                    className="w-[595px] h-[842px]"
                    title="Book reader"
                    style={{
                      background: 'white',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                      border: 'none'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

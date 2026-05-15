import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [showPdf, setShowPdf] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pb-24 md:pb-0">
      <div className="flex flex-col items-center w-full max-w-md">
        <div
          className="glass-card p-8 md:p-10 rounded-2xl mb-8 w-full text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out'
          }}
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 flex items-center justify-center mx-auto mb-5 ring-1 ring-amber-400/20">
            <i className="fas fa-terminal text-amber-400 text-xl"></i>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2 tracking-tight leading-tight">
            Pedro Díaz H.
          </h1>
          <p className="text-sm md:text-base text-gray-400 font-light tracking-wide">
            Automation Engineer
          </p>
        </div>

        <div
          className="flex justify-center gap-6 mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.6s ease-out 0.15s'
          }}
        >
          <a href="https://github.com/PedrodiazH" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-400 hover:text-amber-400">
            <i className="fab fa-github text-xl"></i>
          </a>
          <a href="https://www.linkedin.com/in/pedro-diaz-herrera-715b23175/" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-400 hover:text-amber-400">
            <i className="fab fa-linkedin text-xl"></i>
          </a>
          <a href="https://www.instagram.com/pedroogdh/" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-400 hover:text-amber-400">
            <i className="fab fa-instagram text-xl"></i>
          </a>
          <a href="mailto:pedroidiazh@gmail.com" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-400 hover:text-amber-400">
            <i className="far fa-envelope text-xl"></i>
          </a>
        </div>

        <div
          className="flex flex-col gap-3 w-full"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.6s ease-out 0.3s'
          }}
        >
          <button
            onClick={() => navigate('/proyectos')}
            className="glass-card btn-primary px-6 py-3.5 rounded-xl text-gray-200 text-sm font-medium tracking-wide group w-full flex items-center justify-between cursor-pointer"
          >
            <span className="btn-text flex items-center gap-3">
              <i className="fas fa-folder-open text-amber-400/70 text-xs w-5"></i>
              Proyectos
            </span>
            <i className="fas fa-arrow-right text-xs text-gray-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all"></i>
          </button>

          <button
            onClick={() => navigate('/otros')}
            className="glass-card btn-primary px-6 py-3.5 rounded-xl text-gray-200 text-sm font-medium tracking-wide group w-full flex items-center justify-between cursor-pointer"
          >
            <span className="btn-text flex items-center gap-3">
              <i className="fas fa-star text-amber-400/70 text-xs w-5"></i>
              Otras cositas
            </span>
            <i className="fas fa-arrow-right text-xs text-gray-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all"></i>
          </button>

          <button
            onClick={() => navigate('/opiniones')}
            className="glass-card btn-primary px-6 py-3.5 rounded-xl text-gray-200 text-sm font-medium tracking-wide group w-full flex items-center justify-between cursor-pointer"
          >
            <span className="btn-text flex items-center gap-3">
              <i className="fas fa-comment-dots text-amber-400/70 text-xs w-5"></i>
              Opiniones
            </span>
            <i className="fas fa-arrow-right text-xs text-gray-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all"></i>
          </button>

          <button
            onClick={() => setShowPdf(true)}
            className="glass-card btn-primary px-6 py-3.5 rounded-xl text-gray-200 text-sm font-medium tracking-wide group w-full flex items-center justify-between cursor-pointer"
          >
            <span className="btn-text flex items-center gap-3">
              <i className="fas fa-file-pdf text-amber-400/70 text-xs w-5"></i>
              Curriculum
            </span>
            <i className="fas fa-arrow-right text-xs text-gray-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all"></i>
          </button>
        </div>
      </div>

      {showPdf && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
        >
          <div className="relative w-full max-w-4xl h-[90vh] glass-card rounded-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-3 border-b border-white/10">
              <span className="text-gray-300 text-sm font-light">Curriculum - Pedro Díaz H.</span>
              <button
                onClick={() => setShowPdf(false)}
                className="text-gray-400 hover:text-white transition-colors text-xl cursor-pointer"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <iframe
              src="/CV_pedro_Automation_engineer-1.pdf"
              className="w-full flex-1"
              title="Curriculum PDF"
            />
          </div>
        </div>
      )}
    </div>
  )
}

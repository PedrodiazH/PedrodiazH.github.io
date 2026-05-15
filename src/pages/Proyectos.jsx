import { useEffect, useState } from 'react'
import { projects } from '../data/projects'
import BackButton from '../components/BackButton'
import PageHeader from '../components/PageHeader'

const sorted = [...projects].sort((a, b) => b.year - a.year)

export default function Proyectos() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  const selected = selectedId ? sorted.find(p => p.id === selectedId) : null

  return (
    <div className="min-h-screen p-4 md:p-8 pb-24">
      <PageHeader />
      <BackButton />

      <div className="max-w-4xl mx-auto pt-20 md:pt-28">
        <div
          className="mb-8 md:mb-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.2s'
          }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Proyectos</h2>
          <p className="text-gray-500 text-sm font-light">Selección de trabajos y proyectos</p>
        </div>

        <div
          className="flex flex-col gap-3"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.3s'
          }}
        >
          {sorted.map((project, index) => (
            <button
              key={project.id}
              onClick={() => setSelectedId(project.id)}
              className="glass-card rounded-xl p-3.5 md:p-4 w-full text-left cursor-pointer group transition-all duration-300 hover:border-amber-400/15"
              style={{
                transitionDelay: `${(index * 0.08) + 0.3}s`
              }}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400/15 to-amber-600/10 flex items-center justify-center ring-1 ring-amber-400/20 shrink-0 mt-0.5">
                  <i className={`fas ${project.icon} text-amber-400 text-xs`}></i>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-white truncate">{project.title}</h3>
                    <span className="text-[10px] text-gray-500 font-mono shrink-0">{project.year}</span>
                  </div>

                  <p className="text-[11px] text-gray-400 leading-relaxed mb-2 line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className={`px-2 py-0.5 bg-white/[0.03] border border-white/[0.06] rounded-full text-[9px] font-medium ${tag === 'Aleatoriedad Cuántica' ? 'text-amber-300 border-amber-500/20' : 'text-gray-500'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    {project.links.map((link, i) =>
                      link.locked ? (
                        <span
                          key={i}
                          className="text-gray-600 flex items-center gap-1 text-[10px] font-medium cursor-not-allowed"
                        >
                          <i className="fas fa-lock text-[8px]"></i>
                          {link.label}
                        </span>
                      ) : (
                        <span key={i} className="text-amber-400/70 flex items-center gap-1 text-[10px] font-medium">
                          <i className="fas fa-arrow-right text-[8px]"></i>
                          {link.label}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <i className="fas fa-chevron-right text-[10px] text-gray-600 group-hover:text-amber-400/50 transition-colors mt-2.5"></i>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[2000] flex items-start justify-center p-4 md:p-8 overflow-y-auto"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)' }}
          onClick={() => setSelectedId(null)}
        >
          <div
            className="relative w-full max-w-3xl mt-16 md:mt-24 mb-8 glass-card rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedId(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 transition-colors flex items-center justify-center text-white cursor-pointer"
            >
              <i className="fas fa-times text-sm"></i>
            </button>

            {selected.image && (
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
            )}

            <div className="p-5 md:p-6">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400/20 to-amber-600/10 flex items-center justify-center ring-1 ring-amber-400/20 shrink-0">
                  <i className={`fas ${selected.icon} text-amber-400 text-sm`}></i>
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-white">{selected.title}</h2>
                  <span className="text-[11px] text-gray-500 font-mono">{selected.year}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 my-4">
                {selected.tags.map(tag => (
                  <span
                    key={tag}
                    className={`px-2.5 py-0.5 bg-white/[0.04] border border-white/[0.06] rounded-full text-[10px] font-medium ${tag === 'Aleatoriedad Cuántica' ? 'text-amber-300 border-amber-500/20' : 'text-gray-400'}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-[13px] text-gray-300 leading-relaxed mb-5">{selected.details || selected.description}</p>

              {selected.video && (
                <div className="mb-5 rounded-xl overflow-hidden aspect-video">
                  <iframe
                    src={selected.video}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Project video"
                  />
                </div>
              )}

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 border-t border-white/[0.04]">
                {selected.links.map((link, i) =>
                  link.locked ? (
                    <span
                      key={i}
                      className="text-gray-600 flex items-center gap-1.5 text-[12px] font-medium cursor-not-allowed"
                    >
                      <i className="fas fa-lock text-[9px]"></i>
                      {link.label}
                    </span>
                  ) : (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400/70 hover:text-amber-300 transition-all flex items-center gap-1.5 text-[12px] font-medium group/link"
                    >
                      {link.label}
                      <i className="fas fa-arrow-right text-[9px] group-hover/link:translate-x-0.5 transition-transform"></i>
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

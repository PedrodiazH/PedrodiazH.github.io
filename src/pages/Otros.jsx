import { Suspense, lazy, useEffect, useState } from 'react'
import { otros } from '../data/otros'
import BackButton from '../components/BackButton'
import PageHeader from '../components/PageHeader'

const BookReader = lazy(() => import('../components/BookReader'))

const paperTone = {
  year: '#6e6750',
  title: '#3a3423',
  text: '#4d4733',
  icon: 'rgba(255,255,255,0.5)',
  iconRing: 'rgba(90,84,58,0.22)',
  iconGlyph: '#6b6142',
  tagBg: 'rgba(255,255,255,0.45)',
  tagBorder: 'rgba(90,84,58,0.22)',
  divider: 'rgba(90,84,58,0.2)',
  link: '#5b5334'
}

function GlassItem({ item, delay, onOpenBook }) {
  return (
    <div
      className="glass-card rounded-xl overflow-hidden group flex flex-col"
      style={{ transitionDelay: `${delay}s` }}
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
                onClick={() => onOpenBook(item, link)}
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
  )
}

function PaperItem({ item, delay, onOpenBook }) {
  return (
    <div
      className="paper-card rounded-xl overflow-hidden group flex flex-col"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="p-4 flex flex-col flex-1 z-10 gap-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: paperTone.icon, boxShadow: `inset 0 0 0 1px ${paperTone.iconRing}` }}
            >
              <i className={`fas ${item.icon} text-[10px]`} style={{ color: paperTone.iconGlyph }}></i>
            </div>
            <span className="text-[10px] font-mono" style={{ color: paperTone.year }}>{item.year}</span>
          </div>
        </div>

        <h3 className="text-sm font-semibold leading-snug" style={{ color: paperTone.title }}>{item.title}</h3>

        <p
          className="text-[11px] leading-relaxed"
          style={{ color: paperTone.text }}
          dangerouslySetInnerHTML={{ __html: item.description }}
        />

        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[9px] font-medium"
                style={{ background: paperTone.tagBg, border: `1px solid ${paperTone.tagBorder}`, color: paperTone.text }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div
          className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 mt-auto border-t"
          style={{ borderColor: paperTone.divider }}
        >
          {item.links.map((link, i) =>
            link.url?.endsWith('.pdf') ? (
              <button
                key={i}
                onClick={() => onOpenBook(item, link)}
                className="transition-all flex items-center gap-1 text-[10px] font-semibold group/link cursor-pointer hover:opacity-70"
                style={{ color: paperTone.link }}
              >
                {link.label}
                <i className="fas fa-book-open text-[8px] group-hover/link:translate-x-0.5 transition-transform"></i>
              </button>
            ) : (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all flex items-center gap-1 text-[10px] font-semibold group/link hover:opacity-70"
                style={{ color: paperTone.link }}
              >
                {link.label}
                <i className="fas fa-arrow-right text-[8px] group-hover/link:translate-x-0.5 transition-transform"></i>
              </a>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default function Otros() {
  const [isVisible, setIsVisible] = useState(false)
  const [book, setBook] = useState(null)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  const openBook = (item, link) => setBook({
    url: link.url,
    title: item.book?.title || item.title,
    author: item.book?.author,
    caption: item.description
  })

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
          {otros.map((item, index) => {
            const Card = item.paper ? PaperItem : GlassItem
            return (
              <Card
                key={item.id}
                item={item}
                delay={(index * 0.08) + 0.3}
                onOpenBook={openBook}
              />
            )
          })}
        </div>
      </div>

      {book && (
        <Suspense fallback={null}>
          <BookReader
            url={book.url}
            title={book.title}
            author={book.author}
            caption={book.caption}
            onClose={() => setBook(null)}
          />
        </Suspense>
      )}
    </div>
  )
}

import { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import PageHeader from '../components/PageHeader'

export default function Opiniones() {
  const [isVisible, setIsVisible] = useState(false)

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
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Opiniones</h2>
          <p className="text-gray-500 text-sm font-light">Espacio de reflexiones u opiniones</p>
        </div>

        <div
          className="flex items-center justify-center py-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.6s ease-out 0.3s'
          }}
        >
          <div className="glass-card-static rounded-xl px-8 py-6 text-center">
            <i className="fas fa-feather text-amber-400/50 text-2xl mb-3"></i>
            <p className="text-gray-500 text-sm font-light">Próximamente...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

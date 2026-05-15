import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function BackButton() {
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div
      className="fixed bottom-6 right-6 z-[1001]"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
        transition: 'all 0.6s ease-out 0.2s'
      }}
    >
      <button
        onClick={() => navigate('/')}
        className="glass-card px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-gray-300 text-sm md:text-base font-light hover:text-white hover:bg-white/[0.06] transition-all duration-300 flex items-center gap-2 cursor-pointer"
      >
        <i className="fas fa-arrow-left text-xs"></i>
        <span>Volver</span>
      </button>
    </div>
  )
}

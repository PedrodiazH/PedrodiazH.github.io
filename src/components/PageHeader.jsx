import { useEffect, useState } from 'react'

export default function PageHeader() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div
      className="fixed top-6 left-6 glass-card p-3 md:p-4 rounded-xl z-50"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : 'translate(-20px, -20px)',
        transition: 'all 0.6s ease-out'
      }}
    >
      <h1 className="text-base md:text-xl font-bold gradient-text leading-tight">
        Pedro Díaz H.
      </h1>
      <p className="text-[10px] md:text-xs text-gray-400 tracking-wide font-light">
        Automation Engineer
      </p>
    </div>
  )
}

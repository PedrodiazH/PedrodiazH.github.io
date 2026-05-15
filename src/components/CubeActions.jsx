export default function CubeActions() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:bottom-auto md:top-[200px] md:right-5 z-[1000] flex flex-col gap-2 w-[90%] md:w-[110px] items-center">
      <span className="hidden md:block text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">
        Colaboraciones y webs
      </span>
      <div className="flex flex-row md:flex-col gap-2 w-full justify-center">
      <a
        href="https://www.synaptaing.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="glass-card rounded-lg hover:bg-white/[0.06] transition-all duration-300 w-full shadow-lg overflow-hidden h-[36px] md:h-[44px] flex items-center justify-center"
      >
        <img src="/Banner%20ACtual.jpeg" alt="Consultoría" className="w-full h-full object-cover" />
      </a>

      <a
        href="https://www.jypchile.cl/"
        target="_blank"
        rel="noopener noreferrer"
        className="glass-card rounded-lg hover:bg-white/[0.06] transition-all duration-300 w-full shadow-lg overflow-hidden h-[36px] md:h-[44px] flex items-center justify-center"
      >
        <img src="/logo-jyp-300x300.png" alt="JYPchile" className="h-full w-auto object-contain" />
      </a>

      <a
        href="https://pedrodiazh.github.io/trimmen/"
        target="_blank"
        rel="noopener noreferrer"
        className="glass-card rounded-lg hover:bg-white/[0.06] transition-all duration-300 w-full shadow-lg overflow-hidden h-[36px] md:h-[44px] flex items-center justify-center"
      >
        <span className="text-gray-300 font-medium text-xs md:text-sm tracking-widest uppercase">
          Trimmen
        </span>
      </a>
      </div>
    </div>
  )
}

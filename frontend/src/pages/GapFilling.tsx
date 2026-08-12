import { useState } from "react"
import { CloudRain, Satellite, Sparkles, SlidersHorizontal } from "lucide-react"

export default function GapFilling() {
  const [sliderPos, setSliderPos] = useState(50)

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Satellite Gap Filling</h1>
        <p className="text-slate-500 dark:text-slate-400">Demonstrating AI-based reconstruction of missing satellite observations due to cloud cover.</p>
      </div>

      <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col relative min-h-[600px]">
        
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-white/90 backdrop-blur dark:bg-slate-800/90 py-2 px-2 md:px-4 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-2 md:gap-4 text-[10px] md:text-sm font-medium w-[90%] md:w-auto justify-center">
          <span className="flex items-center gap-1 text-slate-500"><Satellite className="w-3 h-3 md:w-4 md:h-4"/> Raw Satellite</span>
          <div className="w-6 md:w-12 h-1 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full -ml-1"></div>
          </div>
          <span className="flex items-center gap-1 text-primary"><Sparkles className="w-3 h-3 md:w-4 md:h-4"/> DeepAir Reconstructed</span>
        </div>

        <div className="hidden md:block absolute top-6 right-6 z-20 bg-white/90 backdrop-blur dark:bg-slate-800/90 p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 w-64 space-y-4">
          <h3 className="font-bold flex items-center gap-2"><SlidersHorizontal className="w-4 h-4"/> Metrics</h3>
          <div className="space-y-3 text-sm">
            <div>
              <div className="flex justify-between text-slate-500 mb-1"><span>Raw Coverage</span> <span>68%</span></div>
              <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-slate-400 h-2 rounded-full w-[68%]"></div></div>
            </div>
            <div>
              <div className="flex justify-between text-primary mb-1 font-medium"><span>AI Coverage</span> <span>96%</span></div>
              <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-primary h-2 rounded-full w-[96%]"></div></div>
            </div>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded border border-amber-200 dark:border-amber-800/30 text-xs flex items-start gap-2">
            <CloudRain className="w-4 h-4 shrink-0 mt-0.5" />
            <p>Monsoon season creates severe observation gaps. AI reconstruction uses temporal and spatial features to fill missing data.</p>
          </div>
        </div>

        <div className="flex-1 relative overflow-hidden select-none"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
            setSliderPos((x / rect.width) * 100)
          }}
          onTouchMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width))
            setSliderPos((x / rect.width) * 100)
          }}
        >
          {/* Base Layer: Reconstructed (After) */}
          <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
             <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-300 via-orange-300 to-red-400 opacity-60"></div>
             <div className="absolute inset-0 grid place-items-center opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMSIgZmlsbD0iIzAwMCI+PC9jaXJjbGU+Cjwvc3ZnPg==')]"></div>
          </div>

          {/* Top Layer: Raw Satellite (Before) clipped by slider */}
          <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center" style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}>
            <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-300 via-orange-300 to-red-400 opacity-60"></div>
            {/* Cloud mask simulating missing data */}
            <div className="absolute top-[20%] left-[20%] w-[40%] h-[50%] bg-white dark:bg-slate-700 blur-[20px] rounded-full opacity-90 flex items-center justify-center">
              <span className="text-slate-400 font-bold rotate-[-15deg] blur-none text-xl opacity-50">MISSING DATA</span>
            </div>
            <div className="absolute top-[60%] left-[70%] w-[25%] h-[30%] bg-white dark:bg-slate-700 blur-[15px] rounded-full opacity-90"></div>
          </div>

          {/* Slider Line */}
          <div className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)]" style={{ left: `calc(${sliderPos}% - 2px)` }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white text-primary rounded-full shadow-lg flex items-center justify-center border border-slate-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

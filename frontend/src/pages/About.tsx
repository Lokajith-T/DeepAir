import { Brain, Globe, Leaf, Zap, Shield, Factory, CheckCircle } from "lucide-react"

export default function About() {
  return (
    <div className="p-8 max-w-5xl mx-auto overflow-y-auto">
      <div className="text-center mb-16 pt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          DeepAir <span className="text-primary">Intelligence</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
          Pioneering high-resolution geospatial AI to democratize street-level air quality monitoring.
        </p>
      </div>
      
      <div className="space-y-20">
        {/* Section 1 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center justify-center p-2 bg-red-100 text-red-600 rounded-lg mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">The Resolution Problem</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mb-4">
              Traditional satellite monitoring (like Sentinel-5P) provides incredible global coverage, but its raw resolution is often too coarse (3.5km x 5.5km) to identify specific urban pollution sources.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              Furthermore, these observations are frequently disrupted by cloud cover, leaving critical data gaps exactly when environmental agencies need them most.
            </p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-inner flex items-center justify-center min-h-[300px] relative overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMSIgZmlsbD0iIzAwMCI+PC9jaXJjbGU+Cjwvc3ZnPg==')]"></div>
             <div className="relative z-10 w-full h-full border-4 border-dashed border-slate-300 rounded-xl flex items-center justify-center flex-col gap-3 p-6 text-center text-slate-400 font-medium">
               <div className="w-20 h-20 bg-slate-200 rounded-lg flex items-center justify-center">?</div>
               Coarse Grid (3.5km)
             </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 bg-primary/5 rounded-2xl p-8 border border-primary/20 shadow-inner flex items-center justify-center min-h-[300px] relative overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSJub25lIj48L3JlY3Q+CjxjaXJjbGUgY3g9IjEiIGN5PSIxIiByPSIxIiBmaWxsPSIjMThBQTUzIj48L2NpcmNsZT4KPC9zdmc+')]"></div>
             <div className="relative z-10 grid grid-cols-4 grid-rows-4 gap-2 w-full h-full max-w-[200px] max-h-[200px]">
               {Array.from({length: 16}).map((_, i) => (
                 <div key={i} className="bg-primary rounded text-xs flex items-center justify-center text-white font-bold opacity-80" style={{opacity: Math.random() * 0.5 + 0.5}}></div>
               ))}
             </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 text-primary rounded-lg mb-4">
              <Brain className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">The AI Downscaling Solution</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mb-4">
              DeepAir utilizes state-of-the-art machine learning (DeepAir Hybrid Model) to mathematically "downscale" this data. 
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              By fusing raw satellite NO₂ columns with high-resolution meteorology, elevation, and land-use data, the model predicts street-level NO₂ concentrations at resolutions up to 250m.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">Real-World Applications</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">High-resolution environmental intelligence powers decision-making across multiple sectors.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <AppCard icon={Leaf} title="Pollution Control" desc="Enable environmental protection agencies to identify precise emission hotspots." />
            <AppCard icon={Shield} title="Public Health" desc="Correlate street-level air quality with local respiratory health outcomes." />
            <AppCard icon={Factory} title="ESG & Industry" desc="Monitor industrial zone compliance and track ESG environmental metrics." />
          </div>
        </div>
      </div>
    </div>
  )
}

function AppCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
      <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4 text-primary">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
    </div>
  )
}

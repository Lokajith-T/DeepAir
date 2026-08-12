import { useState } from "react"
import { Settings, Play, Database, Layers, CheckCircle2, ChevronRight, Download, MapPin } from "lucide-react"

export default function Prediction() {
  const [isPredicting, setIsPredicting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [complete, setComplete] = useState(false)

  const steps = [
    { label: "Loading satellite data", at: 15 },
    { label: "Processing meteorological features", at: 40 },
    { label: "Processing land-use features", at: 65 },
    { label: "Running AI model", at: 85 },
    { label: "Generating high-resolution map", at: 100 }
  ]

  const currentStep = steps.find(s => progress <= s.at)?.label || "Complete"

  const runPrediction = () => {
    setIsPredicting(true)
    setComplete(false)
    setProgress(0)
    
    let current = 0
    const interval = setInterval(() => {
      current += 2
      setProgress(current)
      if (current >= 100) {
        clearInterval(interval)
        setIsPredicting(false)
        setComplete(true)
      }
    }, 100)
  }

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Generate High-Resolution NO₂ Map</h1>
        <p className="text-slate-500 dark:text-slate-400">Configure parameters and run the DeepAir downscaling model.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="font-semibold flex items-center gap-2 mb-4 border-b pb-2">
              <Settings className="w-4 h-4 text-primary" /> Configuration
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Region</label>
                <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md p-2 text-sm focus:ring-2 focus:ring-primary outline-none">
                  <option>Tamil Nadu</option>
                  <option>Kerala</option>
                  <option>Karnataka</option>
                  <option>Andhra Pradesh</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
                <input type="date" defaultValue="2026-08-12" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md p-2 text-sm focus:ring-2 focus:ring-primary outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Satellite Source</label>
                <div className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md p-2 text-sm text-slate-500 flex items-center gap-2 cursor-not-allowed">
                  <Database className="w-4 h-4"/> Sentinel-5P / TROPOMI
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Resolution</label>
                <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md p-2 text-sm focus:ring-2 focus:ring-primary outline-none">
                  <option>1 km</option>
                  <option>500 m</option>
                  <option>250 m</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Model Architecture</label>
                <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md p-2 text-sm focus:ring-2 focus:ring-primary outline-none">
                  <option>DeepAir Hybrid Model</option>
                  <option>Random Forest</option>
                  <option>XGBoost</option>
                  <option>CNN (Spatial)</option>
                </select>
              </div>
            </div>

            <button 
              onClick={runPrediction} 
              disabled={isPredicting}
              className={`w-full mt-6 py-2.5 rounded-md text-white font-medium flex items-center justify-center gap-2 transition-all shadow-md
                ${isPredicting ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 hover:shadow-lg'}`}
            >
              <Play className="w-4 h-4" />
              {isPredicting ? 'Running...' : 'Generate Prediction'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          {!isPredicting && !complete && (
            <div className="h-full bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 border-dashed flex flex-col items-center justify-center p-10 text-center text-slate-500">
              <Layers className="w-16 h-16 text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">Ready for Inference</h3>
              <p className="max-w-sm text-sm">Select your parameters on the left and click "Generate Prediction" to start the downscaling process.</p>
            </div>
          )}

          {isPredicting && (
            <div className="h-full bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center p-10">
              <div className="w-full max-w-md">
                <h3 className="text-xl font-bold text-center mb-8">Processing AI Inference</h3>
                
                <div className="space-y-6 relative">
                  {steps.map((step, i) => (
                    <div key={i} className={`flex items-center gap-4 transition-all duration-500 ${progress >= (i===0?0:steps[i-1].at) ? 'opacity-100' : 'opacity-30'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 bg-white dark:bg-slate-800
                        ${progress >= step.at ? 'border-primary text-primary' : progress >= (i===0?0:steps[i-1].at) ? 'border-primary animate-pulse text-primary' : 'border-slate-300 text-slate-300'}`}>
                        {progress >= step.at ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-xs font-bold">{i+1}</span>}
                      </div>
                      <div className={`font-medium ${progress >= step.at ? 'text-slate-800 dark:text-white' : 'text-slate-500'}`}>
                        {step.label}
                      </div>
                    </div>
                  ))}
                  <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-slate-700 -z-0"></div>
                  <div className="absolute left-4 top-4 w-0.5 bg-primary transition-all duration-200 -z-0" style={{ height: `${progress}%` }}></div>
                </div>
              </div>
            </div>
          )}

          {complete && (
            <div className="h-full bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-green-200 dark:border-green-900/50 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-green-500"></div>
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-green-50/50 dark:bg-green-900/10">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 text-green-600 p-2 rounded-full">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white">Prediction Complete</h3>
                    <p className="text-xs text-slate-500">DeepAir Hybrid • 1km Resolution • Tamil Nadu</p>
                  </div>
                </div>
                <button className="text-sm flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-md hover:bg-slate-50 transition-colors">
                  <Download className="w-4 h-4" /> Export GeoTIFF
                </button>
              </div>
              
              <div className="flex-1 p-6 flex flex-col items-center justify-center">
                <div className="w-full h-64 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 relative overflow-hidden flex items-center justify-center bg-[url('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/78.6569,11.1271,6,0/800x400?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja3hxYmF4cDQwYWNwMnVtb2E4ZTB2YzI4In0.example')] bg-cover bg-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 via-yellow-500/30 to-red-500/30 mix-blend-multiply"></div>
                  <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg font-medium text-sm flex items-center gap-2 border border-slate-200">
                    <MapPin className="w-4 h-4 text-primary" /> Tamil Nadu NO₂ Hotspots Generated
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-6">
                  <div className="text-center p-3 bg-slate-50 dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800">
                    <div className="text-xs text-slate-500 mb-1">Grid Cells Processed</div>
                    <div className="text-xl font-bold text-primary">130,056</div>
                  </div>
                  <div className="text-center p-3 bg-slate-50 dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800">
                    <div className="text-xs text-slate-500 mb-1">Model R²</div>
                    <div className="text-xl font-bold text-primary">0.91</div>
                  </div>
                  <div className="text-center p-3 bg-slate-50 dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800">
                    <div className="text-xs text-slate-500 mb-1">Est. MAE</div>
                    <div className="text-xl font-bold text-primary">3.17</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

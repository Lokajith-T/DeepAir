import { useEffect, useState } from "react"
import { Wind, AlertTriangle, Activity, BarChart3, MapPin } from "lucide-react"
import Map from "../components/Map"

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null)
  const [selectedLoc, setSelectedLoc] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/dashboard`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Environmental Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">High-resolution NO₂ downscaling overview for Tamil Nadu</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <StatCard title="Average NO₂" value={stats?.average_no2 || "..."} unit="µmol/m²" icon={Wind} trend="+2.4%" />
        <StatCard title="High Pollution Zones" value={stats?.high_pollution_zones || "..."} icon={AlertTriangle} trend="+3" />
        <StatCard title="Model R²" value={stats?.model_r2 || "..."} icon={Activity} />
        <StatCard title="Data Coverage" value={`${stats?.data_coverage || "..."}%`} icon={BarChart3} trend="+1.2%" />
        <StatCard title="Ground Stations" value={stats?.ground_stations || "..."} icon={MapPin} />
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-[400px]">
        {/* Map Container - 70% width */}
        <div className="flex-[7] bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col relative min-h-[500px]">
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur dark:bg-slate-800/90 p-3 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-sm mb-2">NO₂ Pollution Scale</h3>
            <div className="flex flex-col gap-1 text-xs">
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-green-500"></div> Low (&lt;35)</div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-yellow-400"></div> Moderate (35-45)</div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-orange-500"></div> Elevated (45-55)</div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-red-500"></div> High (55-65)</div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-purple-600"></div> Very High (&gt;65)</div>
            </div>
          </div>
          <div className="flex-1 relative bg-slate-100 dark:bg-slate-900">
            <Map onLocationSelect={setSelectedLoc} />
          </div>
        </div>

        {/* Side Panel - 30% width */}
        <div className="flex-[3] flex flex-col gap-4">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex-1">
            <h3 className="font-semibold mb-4 text-lg border-b pb-2">Location Details</h3>
            
            {!selectedLoc ? (
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 border-dashed text-center mt-4">
                <MapPin className="w-10 h-10 mx-auto text-slate-300 mb-3" />
                <p className="text-sm text-slate-500 font-medium">No location selected</p>
                <p className="text-xs text-slate-400 mt-1">Click on a hotspot on the map to view detailed NO₂ concentrations and AI predictions.</p>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Location</p>
                    <h4 className="text-xl font-bold text-primary flex items-center gap-1"><MapPin className="w-5 h-5"/> {selectedLoc.name}, TN</h4>
                  </div>
                  <div className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                    selectedLoc.no2 < 40 ? 'bg-green-100 text-green-700' : 
                    selectedLoc.no2 < 50 ? 'bg-orange-100 text-orange-700' : 
                    'bg-red-100 text-red-700'
                  }`}>
                    {selectedLoc.no2 < 40 ? 'Moderate' : selectedLoc.no2 < 50 ? 'Elevated' : 'High'}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-500 font-medium">AI Prediction</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">{selectedLoc.no2.toFixed(1)} <span className="text-xs font-normal text-slate-400">µmol/m²</span></p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-500 font-medium">Satellite Obs.</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">{selectedLoc.sat.toFixed(1)} <span className="text-xs font-normal text-slate-400">µmol/m²</span></p>
                  </div>
                  <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 col-span-2 flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Model Confidence</span>
                    <span className="font-bold text-primary">{selectedLoc.conf.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h5 className="text-sm font-semibold mb-3">Meteorological Context</h5>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Temperature</span>
                      <span className="font-medium">{selectedLoc.temp}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Humidity</span>
                      <span className="font-medium">{selectedLoc.hum}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Wind Speed</span>
                      <span className="font-medium">{selectedLoc.wind} km/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Elevation</span>
                      <span className="font-medium">{selectedLoc.elev} m</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, unit, icon: Icon, trend }: any) {
  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trend.startsWith('+') ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-slate-800 dark:text-slate-100">
          {value} {unit && <span className="text-sm font-normal text-slate-500">{unit}</span>}
        </h3>
      </div>
    </div>
  )
}

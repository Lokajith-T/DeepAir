import { useState, useEffect } from "react"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts'
import { CheckSquare, Activity, Crosshair, MapPin } from "lucide-react"

export default function Validation() {
  const [metrics, setMetrics] = useState<any>(null)

  useEffect(() => {
    fetch("/api/validation")
      .then(res => res.json())
      .then(data => setMetrics(data))
      .catch(err => console.error(err))
  }, [])

  const scatterData = metrics?.stations?.map((s: any) => ({ x: s.ground_no2, y: s.predicted_no2, name: s.name })) || []
  
  // Mock time-series data
  const timeSeriesData = [
    { day: '01', ground: 42, predicted: 41 },
    { day: '02', ground: 45, predicted: 43 },
    { day: '03', ground: 38, predicted: 40 },
    { day: '04', ground: 50, predicted: 48 },
    { day: '05', ground: 55, predicted: 53 },
    { day: '06', ground: 48, predicted: 49 },
    { day: '07', ground: 44, predicted: 45 },
  ]

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Model Validation</h1>
        <p className="text-slate-500 dark:text-slate-400">Independent scientific validation against ground monitoring stations.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricCard title="RMSE" value={metrics?.rmse || "..."} desc="Root Mean Square Error" />
        <MetricCard title="MAE" value={metrics?.mae || "..."} desc="Mean Absolute Error" />
        <MetricCard title="R² Score" value={metrics?.r2 || "..."} desc="Coefficient of Determination" />
        <MetricCard title="Correlation" value={metrics?.correlation || "..."} desc="Pearson Correlation" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="font-semibold mb-4 text-slate-700 dark:text-slate-300">Predicted vs Ground Truth</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" dataKey="x" name="Ground Truth" unit=" µmol" stroke="#94a3b8" />
                <YAxis type="number" dataKey="y" name="Predicted" unit=" µmol" stroke="#94a3b8" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Scatter name="Stations" data={scatterData} fill="#10b981" />
                {/* Perfect prediction line */}
                <Line type="monotone" dataKey="y" data={[{x:20, y:20}, {x:70, y:70}]} stroke="#ef4444" strokeDasharray="5 5" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="font-semibold mb-4 text-slate-700 dark:text-slate-300">7-Day Time-Series Comparison</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend />
                <Line type="monotone" dataKey="ground" name="Ground Station" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="predicted" name="DeepAir Model" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="font-semibold mb-4 text-slate-700 dark:text-slate-300">Ground Stations Monitor</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50 dark:bg-slate-900/50 uppercase border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-3 rounded-tl-lg">Station</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3 text-right">Ground NO₂</th>
                <th className="px-6 py-3 text-right text-primary">DeepAir Prediction</th>
                <th className="px-6 py-3 text-right">Difference</th>
                <th className="px-6 py-3 rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {metrics?.stations?.map((station: any, idx: number) => (
                <tr key={idx} className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" /> {station.name}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{station.lat}, {station.lon}</td>
                  <td className="px-6 py-4 text-right font-mono">{station.ground_no2.toFixed(1)}</td>
                  <td className="px-6 py-4 text-right font-mono font-semibold text-primary">{station.predicted_no2.toFixed(1)}</td>
                  <td className="px-6 py-4 text-right font-mono">
                    <span className={station.diff > 0 ? "text-orange-500" : "text-green-500"}>
                      {station.diff > 0 ? "+" : ""}{station.diff.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${Math.abs(station.diff) < 2 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {Math.abs(station.diff) < 2 ? 'Excellent' : 'Acceptable'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ title, value, desc }: any) {
  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-center items-center text-center">
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-primary mb-2">{value}</h3>
      <p className="text-xs text-slate-400">{desc}</p>
    </div>
  )
}

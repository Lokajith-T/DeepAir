import { Satellite, Wind, Map, Mountain, MapPin } from "lucide-react"

export default function DataSources() {
  const sources = [
    { title: "Satellite", subtitle: "Sentinel-5P / TROPOMI", icon: Satellite, desc: "High-resolution global daily observations of atmospheric NO₂ column densities.", status: "Available", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { title: "Meteorological", subtitle: "ERA5 / Weather Data", icon: Wind, desc: "Temperature, humidity, wind speed/direction, and boundary layer height.", status: "Processing", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { title: "Land Use", subtitle: "Urban Density & LULC", icon: Map, desc: "Land-cover classifications, road networks, and building density indicators.", status: "Available", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { title: "Topography", subtitle: "SRTM Elevation", icon: Mountain, desc: "Digital Elevation Models (DEM) for modeling terrain-induced airflow changes.", status: "Available", color: "bg-orange-50 text-orange-700 border-orange-200" },
    { title: "Ground Monitoring", subtitle: "CPCB / Reference Stations", icon: MapPin, desc: "High-accuracy regulatory grade measurements for continuous model validation.", status: "Available", color: "bg-purple-50 text-purple-700 border-purple-200" },
  ]

  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Environmental Data Sources</h1>
        <p className="text-slate-500 dark:text-slate-400">DeepAir utilizes a multi-source data fusion pipeline, integrating satellite imagery with local geospatial variables.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sources.map((src, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 ${src.color.split(' ')[0]}`}></div>
            <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center border ${src.color}`}>
              <src.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">{src.title}</h3>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">{src.subtitle}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed min-h-[60px]">{src.desc}</p>
            
            <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
              {src.status === 'Available' ? (
                 <><div className="w-2.5 h-2.5 rounded-full bg-green-500"></div> <span className="text-sm font-medium text-slate-700">Available</span></>
              ) : src.status === 'Processing' ? (
                 <><div className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse"></div> <span className="text-sm font-medium text-slate-700">Processing</span></>
              ) : (
                 <><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div> <span className="text-sm font-medium text-slate-700">Missing</span></>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

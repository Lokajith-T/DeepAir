import { Link, useLocation } from "react-router-dom"
import { Home, Map as MapIcon, BarChart2, CheckSquare, Database, Info, X } from "lucide-react"

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const location = useLocation()
  
  const navItems = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "AI Prediction", path: "/prediction", icon: MapIcon },
    { name: "Map Analysis", path: "/analysis", icon: BarChart2 },
    { name: "Ground Validation", path: "/validation", icon: CheckSquare },
    { name: "Gap Filling", path: "/gap-filling", icon: MapIcon },
    { name: "Data & Sources", path: "/data", icon: Database },
    { name: "About DeepAir", path: "/about", icon: Info },
  ]

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-secondary text-secondary-foreground h-full flex flex-col border-r border-border
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="p-6 border-b border-border flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-primary">DEEPAIR</h1>
            <p className="text-xs text-muted-foreground mt-1">Environmental Intelligence</p>
          </div>
          <button 
            className="lg:hidden text-slate-500 hover:text-slate-800 dark:hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors ${
                  isActive 
                    ? "bg-primary text-primary-foreground font-medium" 
                    : "hover:bg-accent hover:text-accent-foreground text-muted-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-border bg-card shrink-0">
          <div className="text-sm font-semibold mb-1">AI Model</div>
          <div className="text-xs text-muted-foreground mb-3">DeepAir Hybrid v1.0</div>
          <div className="flex items-center text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            Operational
          </div>
        </div>
      </aside>
    </>
  )
}

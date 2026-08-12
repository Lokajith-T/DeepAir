import { Calendar, MapPin, User, Activity, Menu } from "lucide-react"

export default function Header({ setIsSidebarOpen }: { setIsSidebarOpen: (val: any) => void }) {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center space-x-2">
        <button 
          className="lg:hidden p-2 -ml-2 mr-1 text-slate-500 hover:text-slate-800 dark:hover:text-white"
          onClick={() => setIsSidebarOpen((prev: boolean) => !prev)}
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-lg md:text-xl font-bold text-card-foreground m-0 truncate hidden sm:block">DeepAir Environmental Intelligence</h2>
        <h2 className="text-lg font-bold text-card-foreground m-0 sm:hidden">DeepAir</h2>
        <span className="hidden md:inline-block bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded ml-4 border border-primary/20">DEMO MODE</span>
      </div>
      
      <div className="flex items-center space-x-4 md:space-x-6 text-sm">
        <div className="hidden lg:flex items-center text-muted-foreground bg-secondary px-3 py-1.5 rounded-md border border-border">
          <MapPin className="w-4 h-4 mr-2" />
          <span>Tamil Nadu, India</span>
        </div>
        <div className="hidden md:flex items-center text-muted-foreground bg-secondary px-3 py-1.5 rounded-md border border-border">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Aug 12, 2026</span>
        </div>
        <div className="hidden sm:flex items-center text-muted-foreground">
          <Activity className="w-4 h-4 mr-2" />
          <span className="hidden md:inline">Model Status: OK</span>
          <span className="md:hidden">OK</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 text-primary cursor-pointer shrink-0">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  )
}

import { Outlet } from "react-router-dom"
import { useState } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-auto bg-slate-50/50 dark:bg-slate-900/20 relative">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

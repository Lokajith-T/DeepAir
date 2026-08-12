import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Dashboard from "./pages/Dashboard"
import Prediction from "./pages/Prediction"
import Analysis from "./pages/Analysis"
import Validation from "./pages/Validation"
import GapFilling from "./pages/GapFilling"
import DataSources from "./pages/DataSources"
import About from "./pages/About"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="prediction" element={<Prediction />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="validation" element={<Validation />} />
          <Route path="gap-filling" element={<GapFilling />} />
          <Route path="data" element={<DataSources />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

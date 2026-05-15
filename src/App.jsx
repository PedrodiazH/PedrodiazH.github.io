import { Routes, Route } from 'react-router-dom'
import DiceCanvas from './components/DiceCanvas'
import CubeActions from './components/CubeActions'
import Home from './pages/Home'
import Proyectos from './pages/Proyectos'
import Otros from './pages/Otros'
import Opiniones from './pages/Opiniones'

export default function App() {
  return (
    <>
      <DiceCanvas />
      <CubeActions />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/otros" element={<Otros />} />
        <Route path="/opiniones" element={<Opiniones />} />
      </Routes>
    </>
  )
}

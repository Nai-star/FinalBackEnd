import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from "../pages/Home"
import LoginUsuario from "../pages/LoginUsuario"
import RegistroUsuario from '../pages/RegistroUsuario'
import Carrito from '../pages/Carrito'
import Catalogo from '../components/catalago/Catalogo'
import Emprendedor from '../components/emprendedor/Emprendedor'

const Routing=()=> {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<LoginUsuario/>}/>
            <Route path="/registro" element={<RegistroUsuario/>}/>
             <Route path="/carrito" element={<Carrito/>}/>
             <Route path="/catalogo" element={<Catalogo/>}/>
             <Route path="/emprendedor" element={<Emprendedor/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default Routing

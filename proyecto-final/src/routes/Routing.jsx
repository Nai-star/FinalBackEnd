import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from "../pages/Home"
import LoginUsuario from "../pages/LoginUsuario"
import RegistroUsuario from '../pages/RegistroUsuario'
import Carrito from '../pages/Carrito'

const Routing=()=> {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<LoginUsuario/>}/>
            <Route path="/registro" element={<RegistroUsuario/>}/>
             <Route path="/carrito" element={<Carrito/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default Routing

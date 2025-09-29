import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from "../pages/Home"
import LoginUsuario from "../pages/LoginUsuario"
import RegistroUsuario from '../pages/RegistroUsuario'
import Carrito from '../pages/Carrito'
import CatalogoP from "../pages/CatalogoP"
import PaginaEmprendedor from '../pages/PaginaEmprendedor'
import LoginEmpren from "../pages/LoginEmpren"
import ColeccionP from '../pages/ColeccionP'
import EspecificacionProducto from '../pages/Especificacion'
import DetallesP from '../pages/DetallesP'
import EnvioP from '../pages/EnvioP'


const Routing=()=> {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<LoginUsuario/>}/>
            <Route path="/registro" element={<RegistroUsuario/>}/>
             <Route path="/carrito" element={<Carrito/>}/>
             <Route path="/catalogo" element={<CatalogoP/>}/>
             <Route path="/Paginaemprendedores" element={<PaginaEmprendedor/>}/>
             <Route path="/loginemprendedor" element={<LoginEmpren/>}/>
             <Route path="/coleccion" element={<ColeccionP/>}/>
             <Route path="/producto/:id" element={<EspecificacionProducto />} />
             <Route path="/detalles" element={<DetallesP />} /> 
            <Route path="/envio" element={<EnvioP />} />
        </Routes>
      </Router>
    </div>
  )
}

export default Routing

import "./carritoinfo.css"
import { useNavigate } from "react-router-dom"

function CarritoInfo() {
  const navigate = useNavigate()
  return (
    <div>
     <div>
         <h1>Productos de tu carrito</h1>
      <p onClick={()=>navigate()}>Volver a comprar</p>
      </div> 
    </div>
  )
}

export default CarritoInfo

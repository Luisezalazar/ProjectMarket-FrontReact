import { ProductCard } from "../../component/ProductCard"
import { products } from "../../register/products"
import img from "../../../public/img/Miaurket.png"
import { ModelProductCard } from "../../component/ModelProductCard"

export const Home = () => {

  return (
    <div className="showcase">
      <h1 className="intro"><strong>¡Bienvenido a MiaurKet!</strong></h1>

      <div className="first">
        <button className="button-first">Ver Productos</button>
      </div>
      <h1 className="intro"><strong>Destacados</strong></h1>
      {/* Products */}
      <div className="products">

        {products.map((item) => (
          <ProductCard img={img} title={item.title} price={item.price} />
        ))}
      </div>
      {/* Model Products*/}
      <div className="modelProducts">
        <ModelProductCard/>
      </div>
    </div>
  )
}

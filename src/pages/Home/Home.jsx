import { ProductCard } from "../../component/ProductCard"
import { products } from "../../register/products"
import img from "../../../public/img/Miaurket.png"
import { ModelProductCard } from "../../component/ModelProductCard"
import { OtherProducts } from "../../component/OtherProducts"
import { Featured } from "../../component/Featured"

export const Home = () => {

  return (
    <div className="showcase">
      <h1 className="intro"><strong>¡Bienvenido a MiaurKet!</strong></h1>

      <section className="first">
        <button className="button-first">Ver Productos</button>
      </section>

      {/* Carousel*/}
      <h1 className="intro">Featured</h1>
      <section className="test">
        <Featured></Featured>
      </section>
      
      


      <h1 className="intro"><strong>Nuestros modelos</strong></h1>
      {/* Model Products*/}
      <section className="modelProducts">
        <ModelProductCard />
      </section>

      {/*Other models*/}
      <h1 className="intro"><strong>Otras categorias</strong></h1>
      <h5 className="intro">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur perferendis praesentium nesciunt quo totam tenetur tempore cupiditate fugit omnis! Quae?</h5>

      <section className="otherProducts">
        <OtherProducts />
      </section>

      {/* Ubication*/}
      <h1 className="intro"><strong>Nos encontramos en</strong></h1>

      <section className="container-ubication">
        <iframe className="map" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=Avenida%20Acoyte%20100+(Clinica%20Medica)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
      </section>








    </div>
  )
}

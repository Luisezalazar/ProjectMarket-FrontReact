import { useRef } from "react";
import img from "../../public/img/Miaurket.png"

export const Featured = () => {

    const products = [
        {
            id: 1,
            title: "Florera En Combo Con Accesorios",
            price: 29000,
            img: `${img}`,
        },
        {
            id: 2,
            title: "Morral Bando Ceniza",
            price: 36000,
            img: `${img}`,
        },
        {
            id: 3,
            title: "Sabal Messi",
            price: 28000,
            img: `${img}`,
        },
        {
            id: 4,
            title: "Tote Bag Negra Actitud",
            price: 32000,
            img: `${img}`,
        },
        {
            id: 5,
            title: "Tote Bag sssNegra Actitud",
            price: 32000,
            img: `${img}`,
        },
        {
            id: 6,
            title: "Tote Bag ddNegra Actitud",
            price: 32000,
            img: `${img}`,
        },
        {
            id: 7,
            title: "Tote Bag ffNegra Actitud",
            price: 32000,
            img: `${img}`,
        },
        {
            id: 8,
            title: "Tote Bag ggNegra Actitud",
            price: 32000,
            img: `${img}`,
        },
        
    ];


    const carouselRef = useRef(null);

    const scrollLeft = () => {
        carouselRef.current.scrollBy({ left: -438, behavior: "smooth" });
    };

    const scrollRight = () => {
        carouselRef.current.scrollBy({ left: 438, behavior: "smooth" });
    };

    return (

        <div className="featuredCarousel-container">
            <button className="arrow left" onClick={scrollLeft}>←</button>
            <div className="featuredCarousel" ref={carouselRef}>
                {products.map((product) => (
                    <div className="featuredProduct-card" key={product.id}>
                        <img src={product.img} alt={product.title} />
                        <h6>{product.title}</h6>
                        <p>${product.price.toLocaleString()}</p>
                    </div>
                ))}
            </div>
            <button className="arrow right" onClick={scrollRight}>→</button>
        </div>

    )
}

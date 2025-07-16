import img from "../../public/img/Miaurket.png"
export const ListProducts = () => {

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
    return (
        <div className="listProducts-container  me-2">
            {products.map((product) => (
                <div className="listProducts-card" key={product.id}>
                    <img className="listImg" src={product.img} alt={product.title} />
                    <h6>{product.title}</h6>
                    <p>${product.price.toLocaleString()}</p>
                </div>
            ))}
        </div>

        

    )
}

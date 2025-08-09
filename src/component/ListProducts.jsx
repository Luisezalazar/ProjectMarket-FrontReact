import img from "../../public/img/Miaurket.png"

export const ListProducts = () => {


    
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

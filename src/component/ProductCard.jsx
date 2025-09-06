import img from "../../public/img/Miaurket.png"

export const ProductCard = ({ product, onAddToCart, onViewProduct }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img  onClick={() => onViewProduct(product)} src={product.images[0]?.url} style={{cursor:'pointer'}} alt={product.title} />
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">${product.price.toLocaleString()}</p>
        <div className="product-details">
          <span className="product-category">{product.category.name}</span>
        </div>
      </div>
      
      <div className="product-actions">
        <button 
          className="btn-add-cart"
          onClick={() => onAddToCart(product)}
        >
          Añadir al Carrito
        </button>
        
      </div>
    </div>
  );
};
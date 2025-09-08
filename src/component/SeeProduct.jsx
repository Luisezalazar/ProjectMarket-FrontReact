import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBack, LocalShipping, Security, CreditCard, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import img from "../../public/img/Miaurket.png";
import { useProducts } from "../hooks/useProducts";

export const SeeProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { product } = location.state || {};
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  
  //Reset img select
  useEffect(() => {
    setSelectedImage(0);
  }, [product?.id]);

  const allProducts = useProducts();

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Producto no encontrado</h2>
        <button onClick={() => navigate('/products')} className="btn-back">
          Volver a productos
        </button>
      </div>
    );
  }

  // Use img product
  const productImages = product.images && product.images.length > 0
    ? product.images.map(image => image.url)
    : [img];

  // Filter simila product
  const similarProducts = allProducts
    .filter(p => p.category.name === product.category.name && p.id !== product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Opcional: mostrar notificación de éxito
    //alert(`${quantity} x ${product.title} añadido al carrito`);
  };

  const handleBuyNow = () => {
    console.log(`Comprar ahora: ${quantity} x ${product.name}`);
    // Aquí implementarías la lógica de compra directa
  };

  const handleViewSimilarProduct = (similarProduct) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/product/${similarProduct.id}`, { state: { product: similarProduct } });
  };

  const maxSlides = Math.max(0, similarProducts.length - 4);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlides));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="product-detail-page">
      <div className="container-fluid">
        {/* Breadcrumb */}
        <div className="breadcrumb-container">
          <button onClick={() => navigate('/products')} className="btn-back-arrow">
            <ArrowBack />
          </button>
          <div className="breadcrumb-span">
            <nav className="breadcrumb">
              <span>Inicio</span> &gt; <span>Productos</span> &gt; <span>{product.category.name}</span> &gt; <span>{product.name}</span>
            </nav>
          </div>

        </div>

        <div className="product-detail-container">
          {/* Galery image*/}
          <div className="product-gallery">
            <div className="thumbnail-list">


              {productImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}



            </div>
            <div className="main-image">
              <img src={productImages[selectedImage]} alt={product.name} />
            </div>
          </div>

          {/* info product*/}
          <div className="product-info-detail">
            <div className="product-status">
              <span className="status-badge">Nuevo</span>
              <span className="stock-info">+25 disponibles</span>
            </div>

            <h1 className="product-title-detail">{product.name}</h1>

            <div className="price-section">
              <div className="current-price">
                ${product.price.toLocaleString()}
              </div>

              <div className="payment-info">
                <span >Mismo precio en 3 cuotas de ${Math.round(product.price / 3).toLocaleString()}</span>
              </div>
            </div>

            {/* options from paymentMethods */}
            <div className="purchase-options">
              <div className="quantity-selector">
                <label className="bold">Cantidad:</label>
                <div className="quantity-controls">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button className="btn-buy-now" onClick={handleBuyNow}>
                  Comprar ahora
                </button>
                <button className="btn-add-to-cart" onClick={handleAddToCart}>
                  Agregar al carrito
                </button>
              </div>
            </div>

            {/* Info delivery and payment methods */}
            <div className="shipping-info">
              <div className="info-item">
                <LocalShipping className="info-icon" />
                <div>
                  <strong>Medios de envío</strong>
                  <p>Conocé los tiempos y las formas de envío.</p>
                </div>
              </div>

              <div className="info-item">
                <Security className="info-icon" />
                <div>
                  <strong>Garantía</strong>
                  <p>Compra Protegida, recibí el producto que esperabas o te devolvemos tu dinero.</p>
                </div>
              </div>

              <div className="info-item">
                <CreditCard className="info-icon" />
                <div>
                  <strong>Medios de pago</strong>
                  <p>Tarjetas de crédito, débito, efectivo y más.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Descripción del producto */}
        <div className="product-description">
          <h3>Descripción</h3>
          <div className="description-content description">

            {product.description}



            <h4>Especificaciones:</h4>
            <div className="specifications">
              <div className="spec-item">
                <strong>Categoría:</strong> {product.category.name}
              </div>
              <div className="spec-item">
                <strong>Marca:</strong> MiaurKet
              </div>
              <div className="spec-item">
                <strong>Modelo:</strong> {product.name}
              </div>
              <div className="spec-item">
                <strong>Garantía:</strong> 12 meses
              </div>
            </div>
          </div>
        </div>

        {/* Productos similares */}
        {similarProducts.length > 0 && (
          <div className="similar-products-section">
            <h3>Productos similares</h3>
            <div className="similar-products-carousel">
              {similarProducts.length > 4 && (
                <button
                  className="carousel-btn carousel-btn-prev"
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                >
                  <ChevronLeft />
                </button>
              )}

              <div className="similar-products-container">
                <div
                  className="similar-products-track"
                  style={{ transform: `translateX(-${currentSlide * 25}%)` }}
                >
                  {similarProducts.map((similarProduct) => (
                    <div key={similarProduct.id} className="similar-product-card">
                      <div className="similar-product-image">
                        <img
                          src={similarProduct.images && similarProduct.images.length > 0
                            ? similarProduct.images[0].url
                            : img}
                          alt={similarProduct.name}
                        />
                      </div>
                      <div className="similar-product-info">
                        <h4 className="similar-product-title">{similarProduct.name}</h4>
                        <p className="similar-product-price">${similarProduct.price.toLocaleString()}</p>
                        <button
                          className="btn-view-similar"
                          onClick={() => handleViewSimilarProduct(similarProduct)}
                        >
                          Ver producto
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {similarProducts.length > 4 && (
                <button
                  className="carousel-btn carousel-btn-next"
                  onClick={nextSlide}
                  disabled={currentSlide >= similarProducts.length - 4}
                >
                  <ChevronRight />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
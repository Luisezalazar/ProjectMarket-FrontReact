import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBack, LocalShipping, Security, CreditCard, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import img from "../../public/img/Miaurket.png";

export const SeeProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { product } = location.state || {};
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Datos de todos los productos (normalmente vendrían de una API o contexto)
  const allProducts = [
    {
      id: 1,
      title: "Florera En Combo Con Accesorios",
      price: 29000,
      img: img,
      category: "Florera"
    },
    {
      id: 2,
      title: "Morral Bando Ceniza",
      price: 36000,
      img: img,
      category: "Morral"
    },
    {
      id: 3,
      title: "Sabal Messi",
      price: 28000,
      img: img,
      category: "Tabaquera"
    },
    {
      id: 4,
      title: "Tote Bag Negra Actitud",
      price: 32000,
      img: img,
      category: "Tote"
    },
    {
      id: 5,
      title: "Tote Bag Roja Actitud",
      price: 32000,
      img: img,
      category: "Tote"
    },
    {
      id: 6,
      title: "Tote Bag Azul Actitud",
      price: 32000,
      img: img,
      category: "Tote"
    },
    {
      id: 7,
      title: "Florera Decorativa",
      price: 25000,
      img: img,
      category: "Florera"
    },
    {
      id: 8,
      title: "Florera Premium",
      price: 35000,
      img: img,
      category: "Florera"
    },
    {
      id: 9,
      title: "Florera En Combo Con Accesorios222",
      price: 29000,
      img: img,
      category: "Florera"
    },
    {
      id: 10,
      title: "Morral Bando Ceniza22",
      price: 36000,
      img: img,
      category: "Morral"
    },
    {
      id: 11,
      title: "Sabal Messi22",
      price: 28000,
      img: img,
      category: "Tabaquera"
    },
    {
      id: 12,
      title: "Tote Bag Negra Actitud22",
      price: 32000,
      img: img,
      category: "Tote"
    },
    {
      id: 13,
      title: "Tote Bag Roja Actitud22",
      price: 32000,
      img: img,
      category: "Tote"
    },
    {
      id: 14,
      title: "Tote Bag Azul Actitud22",
      price: 32000,
      img: img,
      category: "Tote"
    },
    {
      id: 15,
      title: "Florera Decorativa22",
      price: 25000,
      img: img,
      category: "Florera"
    },
    {
      id: 16,
      title: "Florera Premium22",
      price: 35000,
      img: img,
      category: "Florera"
    },
    {
      id: 17,
      title: "Florera En Combo Con Accesorios222",
      price: 29000,
      img: img,
      category: "Florera"
    },
    {
      id: 18,
      title: "Morral Bando Ceniza22",
      price: 36000,
      img: img,
      category: "Morral"
    },
    {
      id: 19,
      title: "Sabal Messi22",
      price: 28000,
      img: img,
      category: "Tabaquera"
    },
    {
      id: 20,
      title: "Tote Bag Negra Actitud22",
      price: 32000,
      img: img,
      category: "Tote"
    },
    {
      id: 21,
      title: "Tote Bag Roja Actitud22",
      price: 32000,
      img: img,
      category: "Tote"
    },
    {
      id: 22,
      title: "Tote Bag Azul Actitud22",
      price: 32000,
      img: img,
      category: "Tote"
    },
    {
      id: 23,
      title: "Florera Decorativa22",
      price: 25000,
      img: img,
      category: "Florera"
    },
    {
      id: 24,
      title: "Florera Premium22",
      price: 35000,
      img: img,
      category: "Florera"
    }
  ];

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

  // Simulamos múltiples imágenes del producto
  const productImages = [product.img, product.img, product.img, product.img];

  // Filtrar productos similares (misma categoría, excluyendo el producto actual)
  const similarProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id); // Todos los productos similares, sin límite

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Opcional: mostrar notificación de éxito
    //alert(`${quantity} x ${product.title} añadido al carrito`);
  };

  const handleBuyNow = () => {
    console.log(`Comprar ahora: ${quantity} x ${product.title}`);
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
              <span>Inicio</span> &gt; <span>Productos</span> &gt; <span>{product.category}</span> &gt; <span>{product.title}</span>
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
                  alt={`${product.title} ${index + 1}`}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
            <div className="main-image">
              <img src={productImages[selectedImage]} alt={product.title} />
            </div>
          </div>

          {/* info product*/}
          <div className="product-info-detail">
            <div className="product-status">
              <span className="status-badge">Nuevo</span>
              <span className="stock-info">+25 disponibles</span>
            </div>

            <h1 className="product-title-detail">{product.title}</h1>

            <div className="price-section">
              <div className="current-price">
                ${product.price.toLocaleString()}
              </div>

              <div className="payment-info">
                <span >Mismo precio en 3 cuotas de ${Math.round(product.price / 3).toLocaleString()}</span>
              </div>
            </div>

            {/* Opciones de compra */}
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
          <div className="description-content">
            <p>
              {product.title} es un producto de alta calidad diseñado para satisfacer tus necesidades.
              Fabricado con materiales premium y con atención al detalle.
            </p>
            <h4>Características principales:</h4>
            <ul>
              <li>Material de alta calidad</li>
              <li>Diseño moderno y funcional</li>
              <li>Fácil de usar y mantener</li>
              <li>Garantía de satisfacción</li>
            </ul>

            <h4>Especificaciones:</h4>
            <div className="specifications">
              <div className="spec-item">
                <strong>Categoría:</strong> {product.category}
              </div>
              <div className="spec-item">
                <strong>Marca:</strong> MiaurKet
              </div>
              <div className="spec-item">
                <strong>Modelo:</strong> {product.title}
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
                        <img src={similarProduct.img} alt={similarProduct.title} />
                      </div>
                      <div className="similar-product-info">
                        <h4 className="similar-product-title">{similarProduct.title}</h4>
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
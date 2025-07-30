import { useCart } from '../context/CartContext';
import { Close, Add, Remove, ShoppingBag, Delete } from '@mui/icons-material';

export const CartSidebar = () => {
  const { 
    items, 
    isOpen, 
    toggleCart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getTotalPrice 
  } = useCart();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    alert('Funcionalidad de checkout - Por implementar');
    // Aquí implementarías la lógica de checkout
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="cart-overlay" 
          onClick={toggleCart}
        />
      )}

      {/* Sidebar del carrito */}
      <div className={`cart-sidebar ${isOpen ? 'cart-sidebar-open' : ''}`}>
        {/* Header del carrito */}
        <div className="cart-header">
          <h3>
            <ShoppingBag className="cart-header-icon" />
            Carrito de Compras
          </h3>
          <button className="cart-close-btn" onClick={toggleCart}>
            <Close />
          </button>
        </div>

        {/* Contenido del carrito */}
        <div className="cart-content">
          {items.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag className="cart-empty-icon" />
              <p>Tu carrito está vacío</p>
              <span>Agrega productos para comenzar</span>
            </div>
          ) : (
            <>
              {/* Lista de productos */}
              <div className="cart-items">
                {items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.img} alt={item.title} />
                    </div>
                    
                    <div className="cart-item-details">
                      <h4 className="cart-item-title">{item.title}</h4>
                      <p className="cart-item-category">{item.category}</p>
                      <p className="cart-item-price">${item.price.toLocaleString()}</p>
                    </div>

                    <div className="cart-item-actions">
                      <div className="cart-quantity-controls">
                        <button 
                          className="cart-qty-btn"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Remove />
                        </button>
                        <span className="cart-quantity">{item.quantity}</span>
                        <button 
                          className="cart-qty-btn"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Add />
                        </button>
                      </div>
                      
                      <button 
                        className="cart-remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Delete />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer del carrito */}
              <div className="cart-footer">
                <div className="cart-total">
                  <div className="cart-total-row">
                    <span>Subtotal:</span>
                    <span>${getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="cart-total-row cart-total-final">
                    <strong>Total: ${getTotalPrice().toLocaleString()}</strong>
                  </div>
                </div>

                <div className="cart-actions">
                  <button 
                    className="cart-clear-btn"
                    onClick={clearCart}
                  >
                    Vaciar Carrito
                  </button>
                  <button 
                    className="cart-checkout-btn"
                    onClick={handleCheckout}
                  >
                    Finalizar Compra
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
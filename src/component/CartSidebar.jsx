
import { useCart } from '../context/CartContext';
import { Close, Add, Remove, ShoppingBag, Delete } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from "../../public/img/Miaurket.png"

export const CartSidebar = () => {
  const {
    items,
    isOpen,
    email,
    setEmail,
    toggleCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    
  } = useCart();

  const [state, setState] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("")


  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };
  const handleTransaction = () => {

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Por favor ingresá un email válido.');
      setTimeout(() => setError(''), 2000);
      return;
    }

    navigate("/payment")
    toggleCart()

  }

  console.log("El email es " ,email)


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
                      <img src={img} alt={item.name} />
                    </div>

                    <div className="cart-item-details">
                      <h4 className="cart-item-title">{item.name}</h4>
                      <p className="cart-item-category">{item.category.name}</p>
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
                {state ? (
                  <>
                    <div className="cart-actions">
                      <p className='bold' style={{textAlign:"center"}}>Coloque su mail para continuar</p>
                      {error && (
                        <div className="error">
                            {error}
                        </div>
                    )}
                      <input type="email" value={email || ''} onChange={(e)=> setEmail(e.target.value)} placeholder='mail@mail.com'/>
                      <button className="cart-clear-btn" onClick={() => setState(false)}>
                        Volver
                      </button>
                      <button className="cart-checkout-btn" onClick={handleTransaction}> 
                        Continuar
                      </button>
                      
                    </div>
                  </>
                ) : (
                  <div className="cart-actions">
                    <button className="cart-clear-btn" onClick={clearCart}>
                      Vaciar Carrito
                    </button>
                    <button
                      className="cart-checkout-btn"
                      onClick={()=> setState(true)}
                    >
                      Pagar con Transferencia/CBU
                    </button>
                    <button className="cart-checkout-btn">
                      Pagar con MercadoPago
                    </button>
                  </div>
                )}

              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
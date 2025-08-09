import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { PaymentMethods } from './PaymentMethods';
import { useNavigate } from 'react-router-dom';

export const Payment = () => {
  const { items } = useCart();
  const navigate = useNavigate();
  const [showPaymentMethods, setShowPaymentMethods] = useState(true);

  // Si no hay productos en el carrito, redirigir
  if (items.length === 0) {
    return (
      <div className="payment-empty">
        <h2>No hay productos en tu carrito</h2>
        <p>Agrega algunos productos antes de proceder al pago.</p>
        <button 
          className="btn-back-to-products"
          onClick={() => navigate('/products')}
        >
          Ver Productos
        </button>
      </div>
    );
  }

  const handleBackToCart = () => {
    navigate('/products');
  };

  return (
    <div className="payment-page">
      {showPaymentMethods && (
        <PaymentMethods onBack={handleBackToCart} />
      )}
    </div>
  );
};
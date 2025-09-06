import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import {
    AccountBalance,
    ContentCopy,
    Store,
    ShoppingBag,
    CheckCircle,
    ArrowBack
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


export const PaymentMethods = ({ onBack }) => {
    const { items, getTotalPrice, clearCart, email } = useCart();
    const [copySuccess, setCopySuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!email) {
            navigate("/*")
        }
    }, [])

    // Info pyme
    const storeInfo = {
        name: "MiaurKet",
        address: "CalleCreada 123",
        city: "CABA",
        phone: "11-2222-3333",
        email: "miaurket@miaurket.com",
        openFromTo: "10hs a 19hs"
    };

    // info bank
    const bankInfo = {
        bank: "Mercado Pago",
        accountNumber: "123-456789-01",
        alias: "Miaurket.mp",
        holder: "MiaurKet",
    };

    const handleCopyAlias = async () => {
        try {
            await navigator.clipboard.writeText(bankInfo.alias);
            setCopySuccess('¡Alias copiado!');
            setTimeout(() => setCopySuccess(''), 2000);
        } catch (err) {
            setCopySuccess('Error al copiar');
            setTimeout(() => setCopySuccess(''), 2000);
        }
    };

    const handleConfirmPayment = () => {
        alert('¡Gracias por tu compra! Recibirás un email de confirmación una vez procesemos tu transferencia.');
        clearCart();
        onBack();
    };



    return (
        <div className="payment-methods-container">

            {/* Instructions and payments */}
            <div className="payment-section instructions-section">
                    <h3>Instrucciones de Pago</h3>
                    <div className="instructions">
                        <ol>
                            <li>Realiza la transferencia por el monto total: <strong>${getTotalPrice().toLocaleString()}</strong></li>
                            <li>Usa el alias <strong>{bankInfo.alias}</strong></li>
                            <li>Verifique su transferencia enviada a su mail </li>
                        </ol>
                    </div>

                </div>
                <br />
            {/* Header */}
            <div className="payment-header">
                <button className="payment-back-btn" onClick={onBack}>
                    <ArrowBack />
                </button>
                <h2>Pago por Transferencia Bancaria</h2>
            </div>

            <div className="payment-header">
                <button className="payment-back-btn" onClick={onBack}>
                    <ArrowBack />
                </button>
                <h2>Su email es: {email}</h2>
            </div>

            <div className="payment-content">
                {/* Sections Alias/info bank*/}
                <div className="payment-section bank-section">
                    <div className="section-header">
                        <AccountBalance className="section-icon" />
                        <h3>Datos para Transferencia</h3>
                    </div>

                    <div className="bank-details">
                        <div className="bank-item">
                            <label>Banco:</label>
                            <span>{bankInfo.bank}</span>
                        </div>



                        <div className="bank-item highlight">
                            <label>Alias:</label>
                            <div className="copyable-field alias-field">
                                <span className="alias-text">{bankInfo.alias}</span>
                                <button className="copy-btn" onClick={handleCopyAlias}>
                                    <ContentCopy />
                                </button>
                            </div>
                        </div>

                        <div className="bank-item">
                            <label>Titular:</label>
                            <span>{bankInfo.holder}</span>
                        </div>

                    </div>

                    {copySuccess && (
                        <div className="copy-success">
                            <CheckCircle />
                            {copySuccess}
                        </div>
                    )}
                </div>

                {/* Sección del Local */}
                <div className="payment-section store-section">
                    <div className="section-header">
                        <Store className="section-icon" />
                        <h3>Información del Local</h3>
                    </div>

                    <div className="store-details">
                        <div className="store-item">
                            <label>Nombre:</label>
                            <span>{storeInfo.name}</span>
                        </div>

                        <div className="store-item">
                            <label>Dirección:</label>
                            <span>{storeInfo.address}</span>
                        </div>

                        <div className="store-item">
                            <label>Horario:</label>
                            <span><strong>{storeInfo.openFromTo}</strong></span>
                        </div>
                        <div className="store-item">
                            <label>Ciudad:</label>
                            <span>{storeInfo.city}</span>
                        </div>

                        <div className="store-item">
                            <label>Teléfono:</label>
                            <span>{storeInfo.phone}</span>
                        </div>

                        <div className="store-item">
                            <label>Email:</label>
                            <span>{storeInfo.email}</span>
                        </div>
                    </div>
                </div>

                {/* Section products */}
                <div className="payment-section products-section">
                    <div className="section-header">
                        <ShoppingBag className="section-icon" />
                        <h3>Resumen de Compra</h3>
                    </div>

                    <div className="products-summary">
                        {items.map((item) => (
                            <div key={item.id} className="summary-item">
                                <div className="summary-image">
                                    <img src={item.img} alt={item.title} />
                                </div>
                                <div className="summary-details">
                                    <h4>{item.title}</h4>
                                    <p className="summary-category">{item.category}</p>
                                    <div className="summary-price-qty">
                                        <span className="summary-qty">Cantidad: {item.quantity}</span>
                                        <span className="summary-price">${item.price.toLocaleString()}</span>
                                    </div>
                                    <div className="summary-subtotal">
                                        Subtotal: ${(item.price * item.quantity).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="summary-total">
                            <div className="total-row">
                                <span>Total de productos:</span>
                                <span>{items.reduce((total, item) => total + item.quantity, 0)}</span>
                            </div>
                            <div className="total-row final-total">
                                <strong>Total a pagar: ${getTotalPrice().toLocaleString()}</strong>
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    );
};

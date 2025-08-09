import { createContext, useContext, useReducer, useState } from 'react';

// Acciones del carrito
const CART_ACTIONS = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    CLEAR_CART: 'CLEAR_CART'
};

// Reducer del carrito
const cartReducer = (state, action) => {
    switch (action.type) {
        case CART_ACTIONS.ADD_ITEM: {
            const { product, quantity = 1 } = action.payload;
            const existingItem = state.items.find(item => item.id === product.id);

            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    )
                };
            }

            return {
                ...state,
                items: [...state.items, { ...product, quantity }]
            };
        }

        case CART_ACTIONS.REMOVE_ITEM: {
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id)
            };
        }

        case CART_ACTIONS.UPDATE_QUANTITY: {
            const { id, quantity } = action.payload;

            if (quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter(item => item.id !== id)
                };
            }

            return {
                ...state,
                items: state.items.map(item =>
                    item.id === id ? { ...item, quantity } : item
                )
            };
        }

        case CART_ACTIONS.CLEAR_CART: {
            return {
                ...state,
                items: []
            };
        }

        case TOGGLE_CART: {
            return {
                ...state,
                isOpen: !state.isOpen
            };
        }

        default:
            return state;
    }
};

// Estado inicial
const initialState = {
    items: [],
    isOpen: false,
};

// Acción para toggle del carrito
const TOGGLE_CART = 'TOGGLE_CART';

// Crear el contexto
const CartContext = createContext();

// Provider del carrito
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const [email, setEmail] = useState();

    // Funciones del carrito
    const addToCart = (product, quantity = 1) => {
        dispatch({
            type: CART_ACTIONS.ADD_ITEM,
            payload: { product, quantity }
        });
    };

    const removeFromCart = (id) => {
        dispatch({
            type: CART_ACTIONS.REMOVE_ITEM,
            payload: { id }
        });
    };

    const updateQuantity = (id, quantity) => {
        dispatch({
            type: CART_ACTIONS.UPDATE_QUANTITY,
            payload: { id, quantity }
        });
    };

    const clearCart = () => {
        dispatch({ type: CART_ACTIONS.CLEAR_CART });
    };

    const toggleCart = () => {
        dispatch({ type: TOGGLE_CART });
    };

    // Calculaciones
    const getTotalItems = () => {
        return state.items.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getItemQuantity = (id) => {
        const item = state.items.find(item => item.id === id);
        return item ? item.quantity : 0;
    };

    const getEmail = () => {
        return email;
    }
    const value = {
        items: state.items,
        isOpen: state.isOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        getTotalItems,
        getTotalPrice,
        getItemQuantity,
        getEmail,
        email,
        setEmail
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// Hook personalizado para usar el carrito
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de CartProvider');
    }
    return context;
};
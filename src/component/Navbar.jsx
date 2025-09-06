import ShoppingCart from '@mui/icons-material/ShoppingCart'
import Badge from '@mui/material/Badge'
import { useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import { useCart } from '../context/CartContext';
import { useCategories} from '../hooks/useCategories'


export const Navbar = () => {
    
    const navigate = useNavigate();
    const collapseRef = useRef(null);
    const { getTotalItems, toggleCart } = useCart();

    const categories = useCategories()
    

    useEffect(() => {
        if (collapseRef.current) {
            new window.bootstrap.Collapse(collapseRef.current, {
                toggle: false,
            });
        }
    }, []);

    const handleNavItemClick = () => {
        if (collapseRef.current?.classList.contains('show')) {
            window.bootstrap.Collapse.getInstance(collapseRef.current)?.hide();
        }
    };
    const handleModelClick = (category) => {
        navigate(`/products?category=${encodeURIComponent(category)}`);
    }

    return (
        <nav className="navbar navbar-color navbar-expand-lg navbar-shadow">
            <div className="container-fluid">

                {/* Logo y Brand */}
                <NavLink to='/' className="navbar-brand navbar-title d-flex align-items-center">
                    <img className='img-logo me-2' src="/img/Miaurket.png" alt="MiaurKet Logo" />
                    <strong>MiaurKet</strong>
                </NavLink>

                {/* Barra de búsqueda - Solo visible en desktop */}
                <div className='searchBar d-none d-lg-block'>
                    <input type="text" placeholder='Buscar productos...' className="search-input-navbar" />
                    <div className="search-icon">
                        <SearchIcon />
                    </div>
                </div>

                {/* Botón hamburguesa */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menú colapsable */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent" ref={collapseRef}>

                    {/* Barra de búsqueda móvil */}
                    <div className='searchBar-mobile d-lg-none my-3'>
                        <input type="text" placeholder='Buscar productos...' className="search-input-navbar" />
                        <div className="search-icon">
                            <SearchIcon />
                        </div>
                    </div>

                    {/* Espaciador para centrar la barra de búsqueda en desktop */}
                    <div className="navbar-nav me-auto d-none d-lg-block"></div>

                    {/* Enlaces de navegación - Lado derecho */}
                    <div className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Productos
                            </a>
                            <ul className="dropdown-menu">
                                <li><NavLink to="/products" className="dropdown-item" onClick={handleNavItemClick}>Ver todos los productos</NavLink></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><h6 className="dropdown-header">Categorías</h6></li>
                                {categories.map((c) =>(
                                    <li 
                                    key={c.id}
                                    onClick={()=>handleModelClick(c.name)}
                                    style={{cursor:'pointer'}}
                                    >
                                        <a className='dropdown-item'>{c.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li className="nav-item">
                            <NavLink to='/seeCustomers' className="nav-link d-flex align-items-center" onClick={handleNavItemClick}>
                                <span className="me-1">👤</span>
                                <span>Clientes</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to='/seeProducts' className="nav-link d-flex align-items-center" onClick={handleNavItemClick}>
                                <span className="me-1">🔧</span>
                                <span>Producto</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to='/seeCategories' className="nav-link d-flex align-items-center" onClick={handleNavItemClick}>
                                <span className="me-1">-</span>
                                <span>Categorias</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to='/seeOrders' className="nav-link" onClick={handleNavItemClick}>
                                Pedidos
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to='/createOrder' className="nav-link" onClick={handleNavItemClick}>
                                <button className='btn-create-order'>Crear Pedido</button>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <button 
                                className="nav-link d-flex align-items-center cart-nav-btn" 
                                onClick={() => {
                                    toggleCart();
                                    handleNavItemClick();
                                }}
                            >
                                <Badge badgeContent={getTotalItems()} color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </button>
                        </li>
                    </div>
                </div>
            </div>
        </nav>
    )
}

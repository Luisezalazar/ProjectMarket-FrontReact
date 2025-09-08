import ShoppingCart from '@mui/icons-material/ShoppingCart'
import Badge from '@mui/material/Badge'
import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import { useCart } from '../context/CartContext';
import { useCategories } from '../hooks/useCategories'
import { useProducts } from '../hooks/useProducts'


export const Navbar = () => {

    const navigate = useNavigate();
    const collapseRef = useRef(null);
    const { getTotalItems, toggleCart } = useCart();

    const categories = useCategories()
    const products = useProducts()

    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [showResults, setShowResults] = useState(false)


    useEffect(() => {
        if (collapseRef.current) {
            new window.bootstrap.Collapse(collapseRef.current, {
                toggle: false,
            });
        }
    }, []);

    // Close search results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.searchBar') && !event.target.closest('.searchBar-mobile')) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleNavItemClick = () => {
        if (collapseRef.current?.classList.contains('show')) {
            window.bootstrap.Collapse.getInstance(collapseRef.current)?.hide();
        }
    };
    const handleModelClick = (category) => {
        navigate(`/products?category=${encodeURIComponent(category)}`);
    }

    // function drive search
    const handleSearch = (value) => {
        setSearchTerm(value)

        if (value.trim() === '') {
            setSearchResults([])
            setShowResults(false)
            return
        }

        //Filter product that match 
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(value.toLowerCase()) ||
            product.description?.toLowerCase().includes(value.toLowerCase()) ||
            product.category.name.toLowerCase().includes(value.toLowerCase())
        )

        setSearchResults(filteredProducts.slice(0, 5)) // Limitar a 5 resultados
        setShowResults(true)
    }

    //Function drive click in result
    const handleProductClick = (product) => {
        setShowResults(false)
        setSearchTerm('')
        navigate(`/product/${product.id}`, { state: { product } })
    }

    //Function drive search with enter
    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if (searchTerm.trim() !== '') {
            setShowResults(false)
            navigate(`/products?search=${encodeURIComponent(searchTerm)}`)
        }
    }

    // Close result when click out
    const handleClickOutside = () => {
        setShowResults(false)
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
                <div className='searchBar d-none d-lg-block' style={{ position: 'relative' }}>
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder='Buscar productos...'
                            className="search-input-navbar"
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            onFocus={() => searchResults.length > 0 && setShowResults(true)}
                        />
                        <button type="submit" className="search-icon" style={{ background: 'none', border: 'none' }}>
                            <SearchIcon />
                        </button>
                    </form>

                    {/* Search results */}
                    {showResults && searchResults.length > 0 && (
                        <div className="search-results navbar-searchResult">
                            {searchResults.map((product) => (
                                <div
                                    key={product.id}
                                    className="search-result-item search-result-item2"
                                    onClick={() => handleProductClick(product)}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                                >
                                    <img
                                        src={product.images && product.images.length > 0 ? product.images[0].url : '/img/Miaurket.png'}
                                        alt={product.name}
                                        className='imgSearch'
                                    />
                                    <div>
                                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{product.name}</div>
                                        <div style={{ fontSize: '12px', color: '#666' }}>${product.price.toLocaleString()}</div>
                                    </div>
                                </div>
                            ))}
                            {searchTerm && (
                                <div
                                    className="search-result-item3"
                                    onClick={() => {
                                        setShowResults(false)
                                        navigate(`/products?search=${encodeURIComponent(searchTerm)}`)
                                    }}

                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                                >
                                    Ver todos los resultados para "{searchTerm}"
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Button hamburguesa */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menú  */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent" ref={collapseRef}>

                    {/* Mobile search bar */}
                    <div className='searchBar-mobile d-lg-none my-3' style={{ position: 'relative' }}>
                        <form onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                placeholder='Buscar productos...'
                                className="search-input-navbar"
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                onFocus={() => searchResults.length > 0 && setShowResults(true)}
                            />
                            <button type="submit" className="search-icon" style={{ background: 'none', border: 'none' }}>
                                <SearchIcon />
                            </button>
                        </form>

                        {/* Result from search mobile */}
                        {showResults && searchResults.length > 0 && (
                            <div className="search-results" >
                                {searchResults.map((product) => (
                                    <div
                                        key={product.id}
                                        className="search-result-item2"
                                        onClick={() => handleProductClick(product)}

                                    >
                                        <img
                                            src={product.images && product.images.length > 0 ? product.images[0].url : '/img/Miaurket.png'}
                                            alt={product.name}
                                            className='imgSearch'
                                        />
                                        <div>
                                            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{product.name}</div>
                                            <div style={{ fontSize: '12px', color: '#666' }}>${product.price.toLocaleString()}</div>
                                        </div>
                                    </div>
                                ))}
                                {searchTerm && (
                                    <div
                                        className="search-result-item3"
                                        onClick={() => {
                                            setShowResults(false)
                                            navigate(`/products?search=${encodeURIComponent(searchTerm)}`)
                                        }}
                                        
                                    >
                                        Ver todos los resultados para "{searchTerm}"
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Space to center the search bar desktop */}
                    <div className="navbar-nav me-auto d-none d-lg-block"></div>

                    {/* Navitation links - Right side */}
                    <div className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Productos
                            </a>
                            <ul className="dropdown-menu">
                                <li><NavLink to="/products" className="dropdown-item" onClick={handleNavItemClick}>Ver todos los productos</NavLink></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><h6 className="dropdown-header">Categorías</h6></li>
                                {categories.map((c) => (
                                    <li
                                        key={c.id}
                                        onClick={() => handleModelClick(c.name)}
                                        style={{ cursor: 'pointer' }}
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

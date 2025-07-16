import ShoppingCart from '@mui/icons-material/ShoppingCart'
import Badge from '@mui/material/Badge'
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';

export const Navbar = () => {

    const collapseRef = useRef(null);

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


    return (
        <nav className="navbar navbar-color navbar-expand-lg navbar-shadow">

            <div className="container-fluid d-flex justify-content-between">

                <div className='navbar-icon'>

                    <NavLink to='/' className="navbar-brand navbar-title" href="#"> <img className='img-logo' src="/img/Miaurket.png" alt="" /><strong>MiaurKet</strong></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>

                    </button>

                </div>

                <div className='searchBar'>
                    <input type="text" placeholder='Buscar...' />
                    <div className="search">
                        <SearchIcon></SearchIcon>
                    </div>
                </div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent" ref={collapseRef} >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle bold" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Products
                            </a>
                            <ul className="dropdown-menu">

                                <li><a className="dropdown-item" href="#" ></a></li>
                                <li><NavLink to="/products" className="dropdown-item bold" href="#">Ver todos los productos</NavLink></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><a className="dropdown-item bold" href="#">Categoria1</a></li>
                                <li><a className="dropdown-item" href="#">subCategoria1</a></li>
                                <li><a className="dropdown-item" href="#">subCaterogia2</a></li>
                                <li><a className="dropdown-item" href="#">subCategoria3</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item bold" href="#">Categoria2</a></li>
                                <li><a className="dropdown-item" href="#">subCategoria1</a></li>
                                <li><a className="dropdown-item" href="#">subCaterogia2</a></li>
                                <li><a className="dropdown-item" href="#">subCategoria3</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item bold" href="#">Categoria3</a></li>
                                <li><a className="dropdown-item" href="#">subCategoria1</a></li>
                                <li><a className="dropdown-item" href="#">subCaterogia2</a></li>
                                <li><a className="dropdown-item" href="#">subCategoria3</a></li>

                            </ul>

                        </li>
                        <li className="nav-item">
                            <NavLink to='/seeCustomers' className="nav-link active d-flex bold" onClick={handleNavItemClick}><span>👤</span><span>Customers</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/seeProducts' className="nav-link active d-flex bold" onClick={handleNavItemClick}><span>🔧</span><span>Products</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/seeOrders' className="nav-link active d-flex bold" onClick={handleNavItemClick}>Order</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/createOrder' className="nav-link active " onClick={handleNavItemClick}><button className='buttonNav bold'>CreateOrder</button></NavLink>
                        </li>

                        <NavLink to='/*' className="nav-link active d-flex mx-2">
                            <Badge badgeContent={0} color="secondary">
                                <ShoppingCart color="action" />
                            </Badge>
                        </NavLink>
                    </ul>


                </div>
            </div>

        </nav>
    )
}

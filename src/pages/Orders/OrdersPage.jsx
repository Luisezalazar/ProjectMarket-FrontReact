
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export const OrdersPage = () => {

    const [orders, setOrders] = useState([])
    const [productsCache, setProductsCache] = useState({})

    const [searchTerm, setSearchTerm] = useState("") // search
    const [currentPage, setCurrentPage] = useState(1) // page current
    const itemsPerPage = 6

    //GET
    const fectOrders = async () => {
        const response = await fetch("http://localhost:3000/api/order/getOrder")
        const data = await response.json()
        setOrders(data)

        // Obtener información de productos para todos los ItemOrders
        await fetchProductsForOrders(data)
    }

    // Función para obtener información de productos
    const fetchProductsForOrders = async (orders) => {
        const productIds = new Set()

        // Recopilar todos los productIds únicos
        orders.forEach(order => {
            if (order.ItemOrder) {
                order.ItemOrder.forEach(item => {
                    if (item.productId) {
                        productIds.add(item.productId)
                    }
                })
            }
        })

        // Obtener información de cada producto
        const newProductsCache = {}
        for (const productId of productIds) {
            try {
                const response = await fetch(`http://localhost:3000/api/product/getProducts/${productId}`)

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const productData = await response.json()
                newProductsCache[productId] = productData
            } catch (error) {
                console.error(`Error fetching product ${productId}:`, error)
                newProductsCache[productId] = {
                    id: productId,
                    name: `Error: Producto ${productId}`,
                    price: 0,
                    images: []
                }
            }
        }
        setProductsCache(newProductsCache)
    }
    //Delete
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/order/deleteOrder/${id}`, {
                method: 'DELETE',
            })
            const data = await response.json()

        } catch (error) {
            console.error("Error deleting order: ", error
            )
        }
    }

    //Patch
    const handleState = async (e, id) => {
        const newState = e.target.value
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === id ? { ...order, state: newState } : order
            )
        );

        try {
            const response = await fetch(`http://localhost:3000/api/order/patchState/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ state: newState })
            });
            const result = await response.json()


        } catch (error) {
            console.error("Error update state: ", error)
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === id ? { ...order, state: newState } : order
                )
            );
        }
    }


    //Filter orders for search
    const filteredOrder = [...orders]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter(o =>
        o.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    console.log("ete: ",filteredOrder)
    //Limit page
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentOrders = filteredOrder.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredOrder.length / itemsPerPage)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        fectOrders()
    }, [])

    return (
        <div className="showcase">
            <h1 className="intro">Welcome to interface for Order</h1>
            <h3>List Orders</h3>

            {/* Search */}
            <div className="row mb-3">
                <div className="col-md-6">
                    <input
                        type="text"
                        className='searchBar border border-dark'
                        placeholder='Buscar por nombre o categoria'
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            setCurrentPage(1)
                        }} />
                </div>
            </div>

            {/* Botón crear */}
            <div className="mb-3">
                <NavLink to='/createOrder'>
                    <button className="button">Create Order</button>
                </NavLink>
            </div>


            {/* Tabla */}
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Products</th>
                            <th>State</th>
                            <th>Total</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map(order => {


                            return (
                                <tr key={order.id}>
                                    <td>{order.customer?.name || 'Cliente no disponible'}</td>
                                    <td>
                                        {(() => {
                                            const date = new Date(order.date);
                                            const year = date.getFullYear();
                                            const month = String(date.getMonth() + 1).padStart(2, '0');
                                            const day = String(date.getDate()).padStart(2, '0');
                                            const hours = String(date.getHours()).padStart(2, '0');
                                            const minutes = String(date.getMinutes()).padStart(2, '0');
                                            return `${day}/${month}/${year} - ${hours}:${minutes}`;
                                        })()}
                                    </td>
                                    <td>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '8px',
                                            maxWidth: '300px'
                                        }}>
                                            {/* Manejar la estructura específica de productos */}
                                            {(() => {
                                                // Basado en la estructura real: los productos están en order.ItemOrder
                                                const itemOrders = order.ItemOrder || [];



                                                if (itemOrders && itemOrders.length > 0) {
                                                    return itemOrders.map((itemOrder, index) => {
                                                        // Estructura: {id: 3, quantity: 1, subtotal: '20000', orderId: 2, productId: 1}

                                                        const productId = itemOrder.productId;
                                                        const quantity = itemOrder.quantity || 1;
                                                        const subtotal = itemOrder.subtotal;

                                                        // Obtener información del producto desde el cache
                                                        const product = productsCache[productId] || {
                                                            id: productId,
                                                            name: `Producto ${productId}`,
                                                            price: 0,
                                                            images: []
                                                        };

                                                        return (
                                                            <div
                                                                key={itemOrder.id || index}
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '8px',
                                                                    padding: '4px',
                                                                    border: '1px solid #eee',
                                                                    borderRadius: '4px',
                                                                    backgroundColor: '#f9f9f9'
                                                                }}
                                                            >
                                                                <img
                                                                    src={product.images && product.images.length > 0
                                                                        ? product.images[0].url
                                                                        : '/img/Miaurket.png'}
                                                                    alt={product.name}
                                                                    style={{
                                                                        width: '40px',
                                                                        height: '40px',
                                                                        objectFit: 'cover',
                                                                        borderRadius: '4px',
                                                                        border: '1px solid #ddd'
                                                                    }}
                                                                />
                                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                                    <div style={{
                                                                        fontWeight: 'bold',
                                                                        fontSize: '12px',
                                                                        whiteSpace: 'nowrap',
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis'
                                                                    }}>
                                                                        {product.name}
                                                                    </div>
                                                                    <div style={{
                                                                        fontSize: '11px',
                                                                        color: '#666',
                                                                        display: 'flex',
                                                                        justifyContent: 'space-between'
                                                                    }}>
                                                                        <span>Cant: {quantity}</span>
                                                                        <span>Subtotal: ${parseInt(subtotal).toLocaleString()}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    });
                                                } else {
                                                    return (
                                                        <div style={{
                                                            fontSize: '12px',
                                                            color: '#999',
                                                            fontStyle: 'italic'
                                                        }}>
                                                            Sin productos
                                                        </div>
                                                    );
                                                }
                                            })()}
                                        </div>
                                    </td>
                                    <td>
                                        <select className='select-state' value={order.state} onChange={(e) => handleState(e, order.id)}>
                                            <option value="pending">pending</option>
                                            <option value="inProgress">inProgress</option>
                                            <option value="completed">completed</option>
                                        </select>
                                    </td>
                                    <td>${order.total?.toLocaleString()}</td>
                                    <td>
                                        <button
                                            type='button'
                                            className='btn btn-danger btn-sm me-2'
                                            onClick={() => handleDelete(order.id)}
                                        >
                                            <img src="/img/eliminar.png" alt="Eliminar" style={{ width: "20px" }} />
                                        </button>


                                        <NavLink to={`/editProduct/${order.id}`}>
                                            <button type='button' className='btn btn-warning btn-sm'>
                                                <img src="/img/boton-editar.png" alt="Editar" style={{ width: "20px" }} />
                                            </button>
                                        </NavLink>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>


            {/* Paginación */}
            <nav>
                <ul className="pagination justify-content-center">
                    {Array.from({ length: totalPages }, (_, idx) => (
                        <li
                            key={idx + 1}
                            className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}
                        >
                            <button className="page-link " onClick={() => handlePageChange(idx + 1)}>
                                {idx + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

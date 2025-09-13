import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const CreateOrder = () => {

  const [customers, setCustomers] = useState([]);
  const [allProducts, setAllProducts] = useState([])
  const [product, setProduct] = useState([])
  const [selectCustomer, setSelectCustomer] = useState("")
  const [state, setState] = useState([])
  const navigate = useNavigate()

  //State for search customer
  const [customerSearch, setCustomerSearch] = useState("")
  const [showCustomerResults, setShowCustomerResults] = useState(false)
  const [filteredCustomers, setFilteredCustomers] = useState([])

  //State for search products
  const [productSearches, setProductSearches] = useState({})
  const [showProductResults, setShowProductResults] = useState({})
  const [filteredProducts, setFilteredProducts] = useState({})


  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, [])

 
  //Close result out click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.product-item') && !event.target.closest('[style*="position: relative"]')) {
        setShowCustomerResults(false);
        setShowProductResults({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])


  //Get Customers
  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/customer/getCustomers");
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error loading customers: ", error)
    }

  };

  //Get Products
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/product/getProducts");
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      //console.log("Error loading products: ", error)
    }
  };

  const handleAddProduct = () => {
    const newIndex = product.length;
    setProduct([
      ...product,
      { id: "", quantity: 1 }
    ])
  
    // Init state searh for new product
    setProductSearches(prev => ({ ...prev, [newIndex]: "" }))
    setShowProductResults(prev => ({ ...prev, [newIndex]: false }))
    setFilteredProducts(prev => ({ ...prev, [newIndex]: [] }))
  }

  const removeProduct = (index) => {
    const newItem = [...product]
    newItem.splice(index, 1)
    setProduct(newItem)
    
    
    // Clean state search for delete product
    setProductSearches(prev => {
      const newSearches = { ...prev }
      delete newSearches[index]
      return newSearches
    })
    setShowProductResults(prev => {
      const newResults = { ...prev }
      delete newResults[index]
      return newResults
    })
    setFilteredProducts(prev => {
      const newFiltered = { ...prev }
      delete newFiltered[index]
      return newFiltered
    })
  }

  const handleProductChange = (index, field, value) => {
    const newItem = [...product]
    newItem[index][field] = field === "quantity" ? Number(value) : value;
    setProduct(newItem)
  }

  //Function search customer
  const handleCustomerSearch = (value) => {
    setCustomerSearch(value)
    
    if (value.trim() === '') {
      setFilteredCustomers([])
      setShowCustomerResults(false)
      return
    }

    const filtered = customers.filter(customer =>
      customer.name.toLowerCase().includes(value.toLowerCase()) ||
      customer.lastName?.toLowerCase().includes(value.toLowerCase()) ||
      customer.email?.toLowerCase().includes(value.toLowerCase())
    )

    setFilteredCustomers(filtered.slice(0, 5))
    setShowCustomerResults(true)
  }

  // Función para seleccionar cliente
  const handleSelectCustomer = (customer) => {
    setSelectCustomer(customer.id)
    setCustomerSearch(`${customer.name} ${customer.lastName || ''}`)
    setShowCustomerResults(false)
  }

  // Función para buscar productos
  const handleProductSearch = (index, value) => {
    setProductSearches(prev => ({ ...prev, [index]: value }))
    
    if (value.trim() === '') {
      setFilteredProducts(prev => ({ ...prev, [index]: [] }))
      setShowProductResults(prev => ({ ...prev, [index]: false }))
      return
    }

    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(value.toLowerCase()) ||
      product.description?.toLowerCase().includes(value.toLowerCase()) ||
      product.category.name.toLowerCase().includes(value.toLowerCase())
    )

    setFilteredProducts(prev => ({ ...prev, [index]: filtered.slice(0, 5) }))
    setShowProductResults(prev => ({ ...prev, [index]: true }))
  }

  // Función para seleccionar producto
  const handleSelectProduct = (index, selectedProduct) => {
    handleProductChange(index, "id", selectedProduct.id)
    setProductSearches(prev => ({ ...prev, [index]: selectedProduct.name }))
    setShowProductResults(prev => ({ ...prev, [index]: false }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      customer: selectCustomer,
      Product: product.filter(p => p.id && p.quantity),
      state
    }
    //console.log("Sending order: ", data)
    try {
      const response = await fetch("http://localhost:3000/api/order/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      //console.log("Order created: ", result)
      navigate("/orders")
    } catch (error) {
      console.error("Error creating order: ", error)
    }
  }

  return (

    <div className="showcase">
      <h1 className="intro">Creating Order</h1>
      <div className="form-control">
        <form onSubmit={handleSubmit} id="orderForm">

          {/* Customer*/}
          <label htmlFor="customer" className="bold">Select Customer: </label>
          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Buscar cliente por nombre, apellido o email..."
              value={customerSearch}
              onChange={(e) => handleCustomerSearch(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '5px' }}
            />
            
            {/*Result search customers*/}
            {showCustomerResults && filteredCustomers.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                zIndex: 1000,
                maxHeight: '200px',
                overflowY: 'auto'
              }}>
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    onClick={() => handleSelectCustomer(customer)}
                    style={{
                      padding: '10px',
                      borderBottom: '1px solid #eee',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                  >
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                        {customer.name} {customer.lastName || ''}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {customer.email}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          

          {/* Product and quantity*/}

          <div id="product-select-container">
            {product.map((item, index) => (
              <div key={index} className="product-item" style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                
                {/* Search products*/}
                <div style={{ position: 'relative', marginBottom: '10px' }}>
                  <input
                    type="text"
                    placeholder="Buscar producto por nombre, descripción o categoría..."
                    value={productSearches[index] || ''}
                    onChange={(e) => handleProductSearch(index, e.target.value)}
                    style={{ width: '100%', padding: '8px', marginBottom: '5px' }}
                  />
                  
                  {/* Result search products */}
                  {showProductResults[index] && filteredProducts[index]?.length > 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      backgroundColor: 'white',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      zIndex: 1000,
                      maxHeight: '200px',
                      overflowY: 'auto'
                    }}>
                      {filteredProducts[index].map((prod) => (
                        <div
                          key={prod.id}
                          onClick={() => handleSelectProduct(index, prod)}
                          style={{
                            padding: '10px',
                            borderBottom: '1px solid #eee',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                        >
                          <img 
                            src={prod.images && prod.images.length > 0 ? prod.images[0].url : '/img/Miaurket.png'} 
                            alt={prod.name}
                            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                          />
                          <div>
                            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{prod.name}</div>
                            <div style={{ fontSize: '12px', color: '#666' }}>
                              ${prod.price.toLocaleString()} - {prod.category.name}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                
                
                <input type="number" name="count" min="1" placeholder="Cantidad" required value={item.quantity}
                  onChange={(e) => handleProductChange(index, "quantity", e.target.value)} 
                  style={{ marginLeft: '10px', width: '100px' }} />

                <button type="button" onClick={() => removeProduct(index)} id="deletebutton" style={{ marginLeft: '10px' }}>
                  ❌ Eliminar Producto
                </button>

              </div>
            ))}
          </div>
          <button type="button" className="addbutton" onClick={handleAddProduct}>➕ Add product</button>
          <br />
          {/* State */}
          <label type="radio" className="bold">State: </label>
          <br />
          <label className="bold">
            <input type="radio" name="state" value="pending" onChange={(e) => setState(e.target.value)} /> Pending
          </label>

          <label className="bold">
            <input type="radio" name="state" value="inProgress" onChange={(e) => setState(e.target.value)} /> In progress
          </label>

          <label className="bold">
            <input type="radio" name="state" value="completed" onChange={(e) => setState(e.target.value)} /> Completed
          </label>

          <input type="submit" value="Create" />
        </form >
      </div>

    </div>
  )
}

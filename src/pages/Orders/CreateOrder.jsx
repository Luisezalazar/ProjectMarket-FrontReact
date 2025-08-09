import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const CreateOrder = () => {

  const [customers, setCustomers] = useState([]);
  const [allProducts, setAllProducts] = useState([])
  const [product, setProduct] = useState([])
  const [selectCustomer, setSelectCustomer] = useState("")
  const [state, setState] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    fetchCustomers();
    fetchProducts();
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
    setProduct([
      ...product,
      { id: "", quantity: 1 }
    ])
  }

  const removeProduct = (index) => {
    const newItem = [...product]
    newItem.splice(index, 1)
    setProduct(newItem)
  }

  const handleProductChange = (index, field, value) => {
    const newItem = [...product]
    newItem[index][field] = field === "quantity" ? Number(value) : value;
    setProduct(newItem)
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
          <select id="customer" value={selectCustomer} onChange={(e) => setSelectCustomer(e.target.value)} required>
            <option value=""></option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>{c.id}-{c.name}</option>
            ))}
          </select>

          {/* Product and quantity*/}

          <div id="product-select-container">
            {product.map((item, index) => (
              <div key={index} className="product-item">
                <select name="product" required value={String(item.id)} onChange={(e) => handleProductChange(index, "id", e.target.value)}>
                  <option value=""></option>
                  {allProducts.map((p) => (

                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <input type="number" name="count" min="1" placeholder="Q" required value={item.quantity}
                  onChange={(e) => handleProductChange(index, "quantity", e.target.value)} />

                <button type="button" onClick={() => removeProduct(index)} id="deletebutton">❌ Delete Product</button>

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

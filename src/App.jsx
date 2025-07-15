import { Navigate, Routes, Route } from "react-router-dom"
import { Navbar } from "./component/Navbar"
import { Footer } from "./component/Footer"
import { ProductsPage } from "./pages/Products/ProductsPage"
import { OrdersPage } from "./pages/Orders/OrdersPage"
import { CustomersPage } from "./pages/Customers/CustomersPage"
import { CreateCustomer } from "./pages/Customers/CreateCustomer"
import { CreateProduct } from "./pages/Products/CreateProduct"
import { EditProduct } from "./pages/Products/EditProduct"
import { EditCustomer } from "./pages/Customers/EditCustomer"
import { CreateOrder } from "./pages/Orders/CreateOrder"
import { EditOrder } from "./pages/Orders/EditOrder"
import { Home } from "./pages/Home/Home"
import { Products } from "./pages/Home/Products"

export const App = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <Routes>
          {/* Home */}
          <Route path='/*' element={<Home/>}></Route>
          <Route path="/products" element={<Products/>}></Route>
          {/* Products */}
          <Route path='/seeProducts' element={<ProductsPage/>}></Route>
          <Route path="/createProduct" element={<CreateProduct/>}></Route>
          <Route path="/editProduct/:id" element={<EditProduct/>}></Route>
          {/* Orders */}
          <Route path="/seeOrders" element={<OrdersPage/>}></Route>
          <Route path="/createOrder" element={<CreateOrder/>}></Route>
          <Route path="/editOrder/:id" element={<EditOrder></EditOrder>}></Route>
          {/* Customers */}
          <Route path="/editCustomer/:id" element={<EditCustomer/>}></Route>
          <Route path="/seeCustomers" element={<CustomersPage/>}></Route>
          <Route path="/createCustomer" element={<CreateCustomer/>}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </>
  )
}

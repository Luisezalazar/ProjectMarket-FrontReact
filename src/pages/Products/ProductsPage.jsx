import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'


export const ProductsPage = () => {

  const [products, setProducts] = useState([])
  //GET
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/product/getProducts")
      const data = await response.json()
      if (data) { setProducts(data) }
      console.log(data)
    }
    catch (error) {
      console.log(error)
    }
  }

  //Delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/product/deleteProducts/${id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      //console.log("Product delete: ", data)
      //console.log(response)
      if (response.status === 200) setProducts(i => i.filter(item => item.id !== id))
    } catch (error) {
      //console.error("Error deleting product", error)
    }
  }



  useEffect(() => {
    fetchProducts()
  }, [])


  return (
    <div className="showcase">
      <h1 className="intro">Welcome to interface for Products</h1>
      <h3>List Products</h3>
      <div className="button-center">
        <NavLink to='/createProduct'> <button className="button">Create Product</button></NavLink>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Imagenes</th>
              <th>Options</th>

            </tr>
          </thead>
          <tbody>
            {products && products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.category.name}</td>
                <td>
                  {product.images && product.images.length > 0 ? (
                    <div style={{ display: 'flex', gap: '5px' }}>
                      {product.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img.url}
                          alt={`${product.name} image ${idx + 1}`}
                          className='imgProduct'
                        />
                      ))}
                    </div>
                  ) : (
                    <span>No images</span>
                  )}
                </td>
                <td>
                  <button type='button' className='button-img' onClick={() => handleDelete(product.id)}><img className='img' src="/img/eliminar.png" /></button>
                  <NavLink to={`/editProduct/${product.id}`}><button type='button' className='button-img'><img className='img' src="/img/boton-editar.png" /></button></NavLink>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

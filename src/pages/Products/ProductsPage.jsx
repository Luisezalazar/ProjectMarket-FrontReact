import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'


export const ProductsPage = () => {

  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("") // search
  const [currentPage, setCurrentPage] = useState(1) // page current
  const itemsPerPage = 6

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

  //Filter products for search
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  //Limit page
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    fetchProducts()
  }, [])


  return (
    <div className="showcase">
      <h1 className="intro">Welcome to interface for Products</h1>
      <h3>List Products</h3>

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
        <NavLink to='/createProduct'>
          <button className="button">Create Product</button>
        </NavLink>
      </div>

      {/* Tabla */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
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
            {currentProducts.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.category.name}</td>
                <td>
                  {product.images && product.images.length > 0 ? (
                    <div className="d-flex gap-2">
                      {product.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img.url}
                          alt={`${product.name} image ${idx + 1}`}
                          className="img-thumbnail"
                          style={{ width: "60px", height: "60px", objectFit: "cover" }}
                        />
                      ))}
                    </div>
                  ) : (
                    <span>No images</span>
                  )}
                </td>
                <td>
                  <button
                    type='button'
                    className='btn btn-danger btn-sm me-2'
                    onClick={() => handleDelete(product.id)}
                  >
                    <img src="/img/eliminar.png" alt="Eliminar" style={{ width: "20px" }} />
                  </button>
                  <NavLink to={`/editProduct/${product.id}`}>
                    <button type='button' className='btn btn-warning btn-sm'>
                      <img src="/img/boton-editar.png" alt="Editar" style={{ width: "20px" }} />
                    </button>
                  </NavLink>
                </td>
              </tr>
            ))}
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

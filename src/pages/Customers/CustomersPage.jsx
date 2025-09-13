import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

export const CustomersPage = () => {

  const [customers, setCustomers] = useState([])
  const [searchTerm, setSearchTerm] = useState("") // Search
  const [currentPage, setCurrentPage] = useState(1) // page current
  const itemsPerPage = 6
  //GET
  const fetchCustomers = async () => {
    const response = await fetch("http://localhost:3000/api/customer/getCustomers")
    const data = await response.json()
    //console.log(data)
    setCustomers(data)
  }
  //Delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/customer/deleteCustomers/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json()
      //console.log("Customer delete: ", data)
      if (response.status === 200) setCustomers(i => i.filter(item => item.id !== id))
    } catch (error) {
      console.error("Error deleting customer", error)
    }
  }

  //Filter customers for search
  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  //Limit page
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    fetchCustomers()
  }, [])



  return (
    <div className="showcase">
      <h1 className="intro">Welcome to interface for Customer</h1>
      <h3>List Customers</h3>

      {/* Search */}
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className='searchBar border border-dark'
            placeholder='Buscar por nombre o apellido'
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
              <th>Email</th>
              <th>Phone</th>
              <th>Options</th>

            </tr>
          </thead>
          <tbody>
            {currentCustomers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>

                <td>
                  <button
                    type='button'
                    className='btn btn-danger btn-sm me-2'
                    onClick={() => handleDelete(customer.id)}>
                    <img src="/img/eliminar.png" alt="Eliminar" style={{ width: "20px" }} />
                  </button>


                  <NavLink to={`/editCustomer/${customer.id}`}>
                    <button type='button' className='btn btn-warning btn-sm'>
                      <img src="/img/boton-editar.png" alt="Editar" style={{ width: "20px" }} />
                    </button></NavLink>
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

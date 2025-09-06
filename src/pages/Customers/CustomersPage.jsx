import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

export const CustomersPage = () => {

  const [customers, setCustomers] = useState([])
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


  useEffect(() => {
    fetchCustomers()
  }, [])


  return (
    <div className="showcase">
      <h1 className="intro">Welcome to interface for Customer</h1>
      <h3>List Customers</h3>
      <div className="button-center">
        <NavLink to='/createCustomer'> <button className="button">Create customer</button></NavLink>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Options</th>

            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>

                <td>
                  <button type='button' className='button-img' onClick={() => handleDelete(customer.id)}><img className='img' src="/img/eliminar.png" /></button>
                  <NavLink to={`/editCustomer/${customer.id}`}><button type='button' className='button-img' ><img className='img' src="/img/boton-editar.png" /></button></NavLink>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

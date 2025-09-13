import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export const CategoryPage = () => {

  const [category, setCategory] = useState([])

  // GET
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/category/getAllCategories")
      const data = await response.json()
      if (data) { setCategory(data) }
      console.log(data)
    }
    catch (error) {
      console.log(error)
    }
  }

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/category/deleteCategory/${id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      if (response.status === 200) {
        setCategory(prev => prev.filter(item => item.id !== id))
      }
    } catch (error) {
      console.error("Error deleting category", error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div className="showcase">
      <h1 className="intro">Welcome to interface for Categories</h1>
      <h3>List Categories</h3>
      
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {category && category.map(category => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>
                  {category.urlImage ? (
                    <img
                      src={category.urlImage}
                      alt={category.name}
                      className='imgProduct'
                    />
                  ) : (
                    <span>No image</span>
                  )}
                </td>
                <td>
                  <button 
                    type='button' 
                    className='button-img' 
                    onClick={() => handleDelete(category.id)}
                  >
                    <img className='img' src="/img/eliminar.png" alt="Delete"/>
                  </button>
                  <NavLink to={`/editCategory/${category.id}`}>
                    <button type='button' className='button-img'>
                      <img className='img' src="/img/boton-editar.png" alt="Edit"/>
                    </button>
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
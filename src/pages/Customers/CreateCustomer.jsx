import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const CreateCustomer = () => {

  const [formulary, setform] = useState({
    name: "",
    email: "",
    phone: ""
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setform(previusData => ({
      ...previusData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const request = new Request('http://localhost:3000/api/customer/createCustomer', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formulary)
    })
    try {
      const response = await fetch(request)
      const result = await response.json()
      //console.log(result)
      navigate("/customers")
    } catch (error) {
      console.error("Error create customers", error)
    }
  }

  return (
    <div className="showcase">
      <h1 className="intro">Creating Customers</h1>
      <div className="form-control">
        <form onSubmit={handleSubmit}>

          <label htmlFor="name" className="bold">Name: </label>
          <input type="text" name="name" onChange={handleChange} value={formulary.name} placeholder=" " required />

          <label htmlFor="email" className="bold">Email: </label>
          <input type="email" name="email" onChange={handleChange} value={formulary.email} placeholder="" required />

          <label htmlFor="Phone" className="bold">Phone: </label>
          <input type="text" name="phone" onChange={handleChange} value={formulary.phone} placeholder="" required />

          <input type="submit" value="Create" />
        </form >
      </div>

    </div>
  )
}

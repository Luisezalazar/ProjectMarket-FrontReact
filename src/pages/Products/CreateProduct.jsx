import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const CreateProduct = () => {

    const [formulary, setFormulary] = useState({
        name: "",
        price: "",
        stock: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormulary(previusData => ({
            ...previusData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const request = new Request("http://localhost:3000/api/product/createProduct", {
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
            navigate("/*")
        } catch (error) {
            console.error("Error creating product", error)
        }
    }
    return (
        <div className="showcase">
            <h1 className="intro">Creating Product</h1>
            <div className="form-control">
                <form onSubmit={handleSubmit}>

                    <label htmlFor="name" className="bold">Name: </label>
                    <input type="text" name="name" onChange={handleChange} value={formulary.name} placeholder=" " required />

                    <label htmlFor="email" className="bold">Price: </label>
                    <input type="number" name="price" onChange={handleChange} value={formulary.price} placeholder="" required />

                    <label htmlFor="Phone" className="bold">Stock: </label>
                    <input type="number" name="stock" onChange={handleChange} value={formulary.stock} placeholder="" required />

                    <input type="submit" value="Create" />
                </form >
            </div>

        </div>
    )
}

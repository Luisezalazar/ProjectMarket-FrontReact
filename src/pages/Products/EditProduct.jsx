import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EditProduct = () => {
    const { id } = useParams()

    const [formulary, setFormulary] = useState({
        name: "",
        price: "",
        stock: ""
    })

    const navigate = useNavigate();
    //Get By id
    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/product/getProducts/${id}`)
                const data = await response.json()
                setFormulary({
                    name: data.name,
                    price: data.price,
                    stock: data.stock
                })
            } catch (error) {
                console.error("Error loading Product: ", error)
            }
        }
        getProduct()

    }, [id])
    //Get value for formulary
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormulary(previusData => ({
            ...previusData,
            [name]: value
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const request = new Request(`http://localhost:3000/api/product/updateProducts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formulary)
        })
        try {

            const response = await fetch(request)
            
            const result = await response.json()
            //console.log(result)
            navigate("/*")
        } catch (error) {
            console.error("Error updating product: ", error)
        }



    }

    return (
        <div className="showcase">
            <h1 className="intro">Edit Product</h1>
            <div className="form-control">
                <form onSubmit={handleSubmit} >

                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" onChange={handleChange} value={formulary.name} placeholder=" " required />

                    <label htmlFor="email">Price: </label>
                    <input type="number" name="price" onChange={handleChange} value={formulary.price} placeholder="" required />

                    <label htmlFor="Phone">Stock: </label>
                    <input type="number" name="stock" onChange={handleChange} value={formulary.stock} placeholder="" required />

                    <input type="submit" value="Save" />
                </form >
            </div>

        </div>
    )
}

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCategories } from "../../hooks/useCategories"

export const CreateProduct = () => {

    const [formulary, setFormulary] = useState({
        name: "",
        category: "",
        description: "",
        price: "",
        stock: "",
        images: [],
    })




    const categories = useCategories()

    const navigate = useNavigate()

    const handleFileChange = (e) => {
        setFormulary({ ...formulary, images: e.target.files })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormulary(previusData => ({
            ...previusData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", formulary.name)
        formData.append("category", formulary.category)
        formData.append("description", formulary.description)
        formData.append("price", formulary.price)
        formData.append("stock", formulary.stock)

        for (let i = 0; i < formulary.images.length; i++) {
            formData.append("images", formulary.images[i])
        }
        try {
            const response = await fetch("http://localhost:3000/api/product/createProduct", {
                method: "POST",
                body: formData,
            })

            const result = await response.json()
            console.log(result)
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

                    <label htmlFor="category" className="bold">Category: </label>
                    <input list="browsers" name="category" id="category" className="listCategory" onChange={handleChange} value={formulary.category} required />
                    <datalist id="browsers">
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.name} />
                        ))}
                    </datalist>

                    <label htmlFor="description" className="bold">Descripción del producto: </label>
                    <textarea name="description" id="description" className="textarea" onChange={handleChange}></textarea>


                    <label htmlFor="price" className="bold">Price: </label>
                    <input type="number" name="price" onChange={handleChange} value={formulary.price} placeholder="" required />

                    <label htmlFor="stock" className="bold">Stock: </label>
                    <input type="number" name="stock" onChange={handleChange} value={formulary.stock} placeholder="" required />
                   
                    <label htmlFor="images" className="bold">Imagenes: </label>
                    <input type="file" multiple onChange={handleFileChange} />
                    
                    <input type="submit" value="Create" />
                </form >
            </div>

        </div>
    )
}

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EditProduct = () => {
    const { id } = useParams()

    const [formulary, setFormulary] = useState({
        name: "",
        price: "",
        stock: "",
        images: [] 
    })

    const [existingImages, setExistingImages] = useState([])

    const navigate = useNavigate();

    // GET Product by id
    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/product/getProducts/${id}`)
                const data = await response.json()
                setFormulary({
                    name: data.name,
                    price: data.price,
                    stock: data.stock,
                    images: [] 
                })
                setExistingImages(data.images || [])
            } catch (error) {
                console.error("Error loading Product: ", error)
            }
        }
        getProduct()
    }, [id])

    // Form values
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormulary(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleFileChange = (e) => {
        setFormulary(prev => ({
            ...prev,
            images: e.target.files // FileList
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("name", formulary.name)
        formData.append("price", formulary.price)
        formData.append("stock", formulary.stock)

        
        if (formulary.images && formulary.images.length > 0) {
            for (let i = 0; i < formulary.images.length; i++) {
                formData.append("images", formulary.images[i])
            }
        }

        try {
            const response = await fetch(`http://localhost:3000/api/product/updateProducts/${id}`, {
                method: "PUT",
                body: formData
            })

            const result = await response.json()
            console.log(result)
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

                    <label htmlFor="name" className="bold">Name: </label>
                    <input type="text" name="name" onChange={handleChange} value={formulary.name} placeholder=" " required />

                    <label htmlFor="price" className="bold">Price: </label>
                    <input type="number" name="price" onChange={handleChange} value={formulary.price} placeholder="" required />

                    <label htmlFor="stock" className="bold">Stock: </label>
                    <input type="number" name="stock" onChange={handleChange} value={formulary.stock} placeholder="" required />

                    <label htmlFor="images" className="bold">Existing Images:</label>
                    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                        {existingImages.map((img, idx) => (
                            <img
                                key={idx}
                                src={img.url}
                                alt={`Product ${idx + 1}`}
                                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                            />
                        ))}
                    </div>

                    <label htmlFor="images" className="bold">Add New Images:</label>
                    <input type="file" multiple onChange={handleFileChange} />

                    <input type="submit" value="Save" />
                </form >
            </div>
        </div>
    )
}
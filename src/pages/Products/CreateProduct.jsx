import { useState, useEffect } from "react"
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

    const [imagePreviews, setImagePreviews] = useState([])

    const categories = useCategories()

    const navigate = useNavigate()

    // Cleanup memory on unmount
    useEffect(() => {
        return () => {
            imagePreviews.forEach(preview => {
                URL.revokeObjectURL(preview.url)
            })
        }
    }, [])

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        setFormulary(prev => ({
            ...prev,
            images: [...prev.images, ...files]
        }))

        // Create previews for new images
        const previews = files.map(file => ({
            file,
            url: URL.createObjectURL(file),
            id: Date.now() + Math.random()
        }))
        setImagePreviews(prev => [...prev, ...previews])
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormulary(previusData => ({
            ...previusData,
            [name]: value
        }))
    }

    // Remove image preview
    const removeImage = (index) => {
        const imageToRemove = imagePreviews[index]
        URL.revokeObjectURL(imageToRemove.url) // Clean up memory
        setImagePreviews(prev => prev.filter((_, i) => i !== index))
        setFormulary(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }))
    }

    // Drag and drop for images
    const handleDragStart = (e, index) => {
        e.dataTransfer.setData("text/plain", index.toString())
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e, dropIndex) => {
        e.preventDefault()
        const dragIndex = parseInt(e.dataTransfer.getData("text/plain"))

        const newPreviews = [...imagePreviews]
        const newFiles = [...formulary.images]

        const draggedPreview = newPreviews[dragIndex]
        const draggedFile = newFiles[dragIndex]

        newPreviews.splice(dragIndex, 1)
        newPreviews.splice(dropIndex, 0, draggedPreview)

        newFiles.splice(dragIndex, 1)
        newFiles.splice(dropIndex, 0, draggedFile)

        setImagePreviews(newPreviews)
        setFormulary(prev => ({ ...prev, images: newFiles }))
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
                   
                    <label htmlFor="images" className="bold">Imágenes:</label>
                    <div style={{ display: "flex", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
                        {imagePreviews.map((preview, idx) => (
                            <div
                                key={preview.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, idx)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, idx)}
                                style={{
                                    position: "relative",
                                    cursor: "move",
                                    border: "2px dashed transparent",
                                    borderRadius: "8px"
                                }}
                                onDragEnter={(e) => e.currentTarget.style.border = "2px dashed #007bff"}
                                onDragLeave={(e) => e.currentTarget.style.border = "2px dashed transparent"}
                            >
                                <img
                                    src={preview.url}
                                    alt={`Product ${idx + 1}`}
                                    style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(idx)}
                                    style={{
                                        position: "absolute",
                                        top: "5px",
                                        right: "5px",
                                        background: "red",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "50%",
                                        width: "25px",
                                        height: "25px",
                                        cursor: "pointer",
                                        fontSize: "14px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>

                    <label htmlFor="images" className="bold">Agregar Imágenes:</label>
                    <input type="file" multiple onChange={handleFileChange} accept="image/*" />
                    
                    <input type="submit" value="Create" />
                </form >
            </div>

        </div>
    )
}

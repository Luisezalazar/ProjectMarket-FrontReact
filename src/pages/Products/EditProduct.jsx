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
    const [newImagePreviews, setNewImagePreviews] = useState([])
    const [imagesToDelete, setImagesToDelete] = useState([])

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

    // Cleanup memory on unmount
    useEffect(() => {
        return () => {
            newImagePreviews.forEach(preview => {
                URL.revokeObjectURL(preview.url)
            })
        }
    }, [])

    // Form values
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormulary(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        setFormulary(prev => ({
            ...prev,
            images: files
        }))

        // Create previews for new images
        const previews = files.map(file => ({
            file,
            url: URL.createObjectURL(file),
            id: Date.now() + Math.random()
        }))
        setNewImagePreviews(prev => [...prev, ...previews])
    }

    // Remove existing image
    const removeExistingImage = (index) => {
        const imageToDelete = existingImages[index]
        setImagesToDelete(prev => [...prev, imageToDelete.id])
        setExistingImages(prev => prev.filter((_, i) => i !== index))
    }

    // Remove new image preview
    const removeNewImage = (index) => {
        const imageToRemove = newImagePreviews[index]
        URL.revokeObjectURL(imageToRemove.url) // Clean up memory
        setNewImagePreviews(prev => prev.filter((_, i) => i !== index))
        setFormulary(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }))
    }

    // Drag and drop for existing images
    const handleDragStart = (e, index, type) => {
        e.dataTransfer.setData("text/plain", JSON.stringify({ index, type }))
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e, dropIndex, dropType) => {
        e.preventDefault()
        const dragData = JSON.parse(e.dataTransfer.getData("text/plain"))
        const { index: dragIndex, type: dragType } = dragData

        if (dragType === dropType) {
            if (dragType === "existing") {
                const newImages = [...existingImages]
                const draggedImage = newImages[dragIndex]
                newImages.splice(dragIndex, 1)
                newImages.splice(dropIndex, 0, draggedImage)
                setExistingImages(newImages)
            } else if (dragType === "new") {
                const newPreviews = [...newImagePreviews]
                const newFiles = [...formulary.images]

                const draggedPreview = newPreviews[dragIndex]
                const draggedFile = newFiles[dragIndex]

                newPreviews.splice(dragIndex, 1)
                newPreviews.splice(dropIndex, 0, draggedPreview)

                newFiles.splice(dragIndex, 1)
                newFiles.splice(dropIndex, 0, draggedFile)

                setNewImagePreviews(newPreviews)
                setFormulary(prev => ({ ...prev, images: newFiles }))
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("name", formulary.name)
        formData.append("price", formulary.price)
        formData.append("stock", formulary.stock)

        // Add images to delete
        if (imagesToDelete.length > 0) {
            formData.append("imagesToDelete", JSON.stringify(imagesToDelete))
        }

        // Add existing images order
        if (existingImages.length > 0) {
            const existingImagesOrder = existingImages.map((img, index) => ({
                id: img.id,
                order: index
            }))
            formData.append("existingImagesOrder", JSON.stringify(existingImagesOrder))
        }

        // Add new images
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
                    <div style={{ display: "flex", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
                        {existingImages.map((img, idx) => (
                            <div
                                key={idx}
                                draggable
                                onDragStart={(e) => handleDragStart(e, idx, "existing")}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, idx, "existing")}
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
                                    src={img.url}
                                    alt={`Product ${idx + 1}`}
                                    style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeExistingImage(idx)}
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

                    <label htmlFor="images" className="bold">New Images:</label>
                    <div style={{ display: "flex", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
                        {newImagePreviews.map((preview, idx) => (
                            <div
                                key={preview.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, idx, "new")}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, idx, "new")}
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
                                    alt={`New ${idx + 1}`}
                                    style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeNewImage(idx)}
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

                    <label htmlFor="images" className="bold">Add More Images:</label>
                    <input type="file" multiple onChange={handleFileChange} accept="image/*" />

                    <input type="submit" value="Save" />
                </form >
            </div>
        </div>
    )
}
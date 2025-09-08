import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EditCategory = () => {

    const { id } = useParams()

    const [formulary, setFormulary] = useState({
        name: "",
        images: []
    })

    const [existingImages, setExistingImages] = useState([])
    const [newImagePreviews, setNewImagePreviews] = useState([])
    const [imagesToDelete, setImagesToDelete] = useState([])

    const navigate = useNavigate();

    // GET Category by id
    useEffect(() => {
        const getCategory = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/category/getCategory/${id}`)
                const data = await response.json()
                setFormulary({
                    name: data.name,
                    images: []
                })
                // Assuming the API returns images array, if it's a single image, convert to array
                const images = data.images || (data.urlImage ? [{ id: 1, url: data.urlImage }] : [])
                setExistingImages(images)
            } catch (error) {
                console.error("Error loading Category: ", error)
            }
        }
        getCategory()
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
        setFormulary(previusData => ({
            ...previusData,
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




    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("name", formulary.name)

        // Add images to delete
        if (imagesToDelete.length > 0) {
            formData.append("imagesToDelete", JSON.stringify(imagesToDelete))
        }



        // Add new images
        if (formulary.images && formulary.images.length > 0) {
            for (let i = 0; i < formulary.images.length; i++) {
                formData.append("images", formulary.images[i])
            }
        }

        try {
            const response = await fetch(`http://localhost:3000/api/category/updateCategory/${id}`, {
                method: "PUT",
                body: formData
            })

            const result = await response.json()
            console.log(result)
            navigate("/*")
        } catch (error) {
            console.error("Error updating category: ", error)
        }
    }


    return (
        <div className="showcase">
            <h1 className="intro">Edit Category</h1>
            <div className="form-control">
                <form onSubmit={handleSubmit} >

                    <label htmlFor="name" className="bold">Name: </label>
                    <input type="text" name="name" onChange={handleChange} value={formulary.name} placeholder=" " required />

                    <label htmlFor="images" className="bold">Imágenes Existentes:</label>
                    <div style={{ display: "flex", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
                        {existingImages.map((img, idx) => (
                            <div
                                key={idx}
                                style={{
                                    position: "relative",
                                    borderRadius: "8px"
                                }}
                            >
                                <img
                                    src={img.url}
                                    alt={`Category ${idx + 1}`}
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

                    <label htmlFor="images" className="bold">Nuevas Imágenes:</label>
                    <div style={{ display: "flex", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
                        {newImagePreviews.map((preview, idx) => (
                            <div
                                key={preview.id}
                                style={{
                                    position: "relative",
                                    borderRadius: "8px"
                                }}
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

                    <label htmlFor="images" className="bold">Agregar Más Imágenes:</label>
                    <input type="file" multiple onChange={handleFileChange} accept="image/*" />

                    <input type="submit" value="Save" />
                </form >
            </div>

        </div>
    )
}

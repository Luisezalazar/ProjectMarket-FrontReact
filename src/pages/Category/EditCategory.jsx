import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EditCategory = () => {

    const { id } = useParams()

    const [formulary, setFormulary] = useState({
        name: "",
        image: null
    })

    const [existingImage, setExistingImage] = useState(null)
    const [newImagePreview, setNewImagePreview] = useState(null)

    const navigate = useNavigate();

    // GET Category by id
    useEffect(() => {
        const getCategory = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/category/getCategory/${id}`)
                const data = await response.json()
                setFormulary({
                    name: data.name,
                    image: null
                })
                // Set existing image if it exists
                if (data.urlImage) {
                    setExistingImage(data.urlImage)
                }
            } catch (error) {
                console.error("Error loading Category: ", error)
            }
        }
        getCategory()
    }, [id])

    // Cleanup memory on unmount
    useEffect(() => {
        return () => {
            if (newImagePreview) {
                URL.revokeObjectURL(newImagePreview)
            }
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
        const file = e.target.files[0]
        if (file) {
            // Clean up previous preview
            if (newImagePreview) {
                URL.revokeObjectURL(newImagePreview)
            }

            setFormulary(prev => ({
                ...prev,
                image: file
            }))

            // Create preview for new image
            setNewImagePreview(URL.createObjectURL(file))
        }
    }

    // Remove existing image
    const removeExistingImage = () => {
        setExistingImage(null)
    }

    // Remove new image preview
    const removeNewImage = () => {
        if (newImagePreview) {
            URL.revokeObjectURL(newImagePreview)
        }
        setNewImagePreview(null)
        setFormulary(prev => ({
            ...prev,
            image: null
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("Submitting category update:", {
            name: formulary.name,
            hasNewImage: !!formulary.image,
            hasExistingImage: !!existingImage
        })

        const formData = new FormData()
        formData.append("name", formulary.name)

        // Add new image if selected
        if (formulary.image) {
            formData.append("image", formulary.image)
            console.log("Adding image:", formulary.image.name)
        }

        // Keep existing image URL if no new image and existing image wasn't removed
        if (!formulary.image && existingImage) {
            formData.append("urlImage", existingImage)
        }

        try {
            const response = await fetch(`http://localhost:3000/api/category/updateCategory/${id}`, {
                method: "PUT",
                body: formData
            })

            if (!response.ok) {
                const errorText = await response.text()
                console.error("Server error:", errorText)
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const contentType = response.headers.get("content-type")
            if (contentType && contentType.includes("application/json")) {
                const result = await response.json()
                console.log("Category updated successfully:", result)
                navigate("/*")
            } else {
                // If response is not JSON, just navigate on success
                navigate("/*")
            }
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

                    {existingImage && (
                        <>
                            <label className="bold">Imagen Actual:</label>
                            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                <div
                                    style={{
                                        position: "relative",
                                        borderRadius: "8px"
                                    }}
                                >
                                    <img
                                        src={existingImage}
                                        alt="Category"
                                        style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                                    />
                                    <button
                                        type="button"
                                        onClick={removeExistingImage}
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
                            </div>
                        </>
                    )}

                    {newImagePreview && (
                        <>
                            <label className="bold">Nueva Imagen:</label>
                            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                <div
                                    style={{
                                        position: "relative",
                                        borderRadius: "8px"
                                    }}
                                >
                                    <img
                                        src={newImagePreview}
                                        alt="New"
                                        style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                                    />
                                    <button
                                        type="button"
                                        onClick={removeNewImage}
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
                            </div>
                        </>
                    )}

                    <label htmlFor="image" className="bold">
                        {existingImage || newImagePreview ? "Cambiar Imagen:" : "Agregar Imagen:"}
                    </label>
                    <input type="file" onChange={handleFileChange} accept="image/*" />

                    <input type="submit" value="Save" />
                </form >
            </div>

        </div>
    )
}
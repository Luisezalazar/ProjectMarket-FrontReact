import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EditCategory = () => {

    const { id } = useParams()

    const [formulary, setFormulary] = useState({
        name: "",
        urlImage: ""
    })

    const navigate = useNavigate();

    //Get By id
    useEffect(() => {
        const getCategory = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/category/getCategory/${id}`)
                const data = await response.json()
                setFormulary({
                    name: data.name,
                    urlImage: data.urlImage,
                })
            } catch (error) {
                console.error("Error loading Product: ", error)
            }
        }
        getCategory()

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

        const formData = new FormData()
        formData.append("name", formulary.name)

        if (formulary.urlImage && formulary.urlImage.length > 0) {
            formData.append("image", formulary.urlImage[0]) // solo 1 archivo porque Category tiene un string
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

    const handleFileChange = (e) => {
        setFormulary({ ...formulary, urlImage: e.target.files })
    }


    return (
        <div className="showcase">
            <h1 className="intro">Edit Category</h1>
            <div className="form-control">
                <form onSubmit={handleSubmit} >

                    <label htmlFor="name" className="bold">Name: </label>
                    <input type="text" name="name" onChange={handleChange} value={formulary.name} placeholder=" " required />

                    <label htmlFor="images" className="bold">Imagen: </label>

                    {formulary.urlImage && typeof formulary.urlImage === "string" && (
                        <div style={{ marginBottom: "10px" }}>
                            <img
                                src={formulary.urlImage}
                                alt="Current Category"
                                style={{ width: "150px", height: "150px"}}
                            />
                        </div>
                    )}

                    <input type="file" multiple onChange={handleFileChange} />

                    <input type="submit" value="Save" />
                </form >
            </div>

        </div>
    )
}

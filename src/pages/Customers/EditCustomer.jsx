import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const EditCustomer = () => {

    const { id } = useParams()

    const [formulary, setFormulary] = useState({
        name: "",
        email: "",
        phone: ""
    })

    const navigate = useNavigate()

    //Get by id

    useEffect(() => {
        const getCustomer = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/customer/getCustomers/${id}`)
                const data = await response.json()
                setFormulary({
                    name: data.name,
                    email: data.email,
                    phone: data.phone
                })
            } catch (error) {
                console.error("Error loading customer: ", error)
            }
        }
        getCustomer();

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
        const request = new Request(`http://localhost:3000/api/customer/updateCustomers/${id}`, {
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
            navigate("/customers")
        } catch (error) {

        }
    }

    return (

        <div className="showcase">
            <h1 className="intro">Edit Customer</h1>
            <div className="form-control">
                <form onSubmit={handleSubmit} >

                    <label htmlFor="name" className="bold">Name: </label>
                    <input type="text" name="name" onChange={handleChange} value={formulary.name} placeholder=" " required />

                    <label htmlFor="email" className="bold">Email: </label>
                    <input type="email" name="email" onChange={handleChange} value={formulary.email} placeholder="" required />

                    <label htmlFor="Phone" className="bold">Phone: </label>
                    <input type="number" name="phone" onChange={handleChange} value={formulary.phone} placeholder="" required />

                    <input type="submit" value="Save" />
                </form >
            </div>

        </div>
    )
}

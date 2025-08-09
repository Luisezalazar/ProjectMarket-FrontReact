import { useEffect, useState } from "react"

export const useCategories = () => {

    const [categories, setCategories] = useState([])

    const fetchCategories = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/product/getAllCategories")
            const data = await response.json()
            setCategories(data)
        } catch (error) {
            console.error("Error fetching categories", error)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])
  return categories
}


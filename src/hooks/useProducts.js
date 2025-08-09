import React, { useEffect, useState } from 'react'

export const useProducts = () => {
    const [products, setProducts] = useState([])
    //GET
    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/product/getProducts")
            const data = await response.json()
            if (data) { setProducts(data) }
            console.log(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProducts()


    }, [])

    return products;
}

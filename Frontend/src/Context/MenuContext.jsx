import React, { createContext, useEffect, useState } from 'react'
import { product } from '../assets/assets'
import { backendURL } from '../App'
import axios from 'axios';
import { toast } from 'react-toastify'

export const MenuContext = createContext()

const MenuContextProvider = ({ children }) => {
    const [products, setProducts] = useState(product)

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendURL}/api/product/list`)
            if (response.data.success) {
                setProducts(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        getProductsData()
    }, [])

    return (<MenuContext.Provider value={{ product }}>
        {children}
    </MenuContext.Provider>)
}
export default MenuContextProvider
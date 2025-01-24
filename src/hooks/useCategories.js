import { useEffect, useState } from "react"
import { fetchCategoriesApi } from "../helper/api"





const useCategories=()=>{
    const [categories,setCategories] = useState([])
 
    useEffect(()=>{
        const fetchCategories=async()=>{
            let response = await fetchCategoriesApi()
            
            
            setCategories(response.categories)
    
        }
        fetchCategories()
    
    },[])
    return categories
}

export default useCategories
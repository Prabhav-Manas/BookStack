import axiosInstance from "../../../../config/axiosInstance"

export const getSingleBookService=async(id)=>{
    try{
        const response = await axiosInstance(`/books/${id}`)
        return response.data
    }catch(error){
        throw error.response?.data || error.message
    }
}
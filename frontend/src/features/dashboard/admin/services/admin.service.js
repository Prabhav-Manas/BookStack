// import environment from "../../../../config/environment";
import axiosInstance from "../../../../config/axiosInstance";

// const API_URL=environment.API_URL;

export const addBookService=async(data)=>{
    try{
        const response=await axiosInstance.post(`/books/new-book`, data, 
            {
            headers:{
                "Content-Type":"multipart/form-data",
            }
        }
    );

        return response.data;
    }catch(error){
        throw error.response?.data || error.message;
    }
}

export const fetchAllBooksService=async()=>{
    try{
        const response=await axiosInstance.get(`/books/all-books`)
        return response.data;
    }catch(error){
        throw error.response?.data || error.message;
    }
}

export const updateBookService = async (id, data) => {
    try {
        const response = await axiosInstance.patch(`/books/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const deleteBookService = async (id) => {
    try {
        const response = await axiosInstance.delete(`/books/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const getBookService = async (id) => {
    try {
        const response = await axiosInstance.get(`/books/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}
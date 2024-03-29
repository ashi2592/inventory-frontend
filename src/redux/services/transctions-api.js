import defaultAxios from 'axios';
import { backendUrl } from '../../constant/global';
const type = 'transcation';

const axios = defaultAxios.create({
    baseURL: backendUrl,
    
    headers: {
        'Content-Type': 'application/json',
        storeId: localStorage.getItem('storeId') ? localStorage.getItem('storeId') : null,
        customer: "54887755",
        contract: "inventFashion"
    }
});


/**
 * Get All  list
 * @returns 
 */

export const getList = async (pageno = 1, count = 10, searchText = '') => {

    try {
        const response = await axios.get(`${type}?page=${pageno}&count=${count}&searchText=${searchText}`);
        return response.data
    } catch (error) {
        throw error;
    }

}


/**
 * Get All  list
 * @returns 
 */

 export const getListforCustomer = async (pageno = 1, count = 10, searchText = '',customer='') => {

    try {
        const response = await axios.get(`${type}?page=${pageno}&count=${count}&searchText=${searchText}&customer=${customer}`);
        return response.data
    } catch (error) {
        throw error;
    }

}

/**
 * Get  Details by Id
 * @param {*} id 
 * @returns 
 */

export const getDeatils = async (id) => {

    try {
        const response = await axios.get(`${type}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

/**
 * Add new Category
 */

export const getAdd = async (data) => {
    try {

        console.log("Transaction", data)
        const response = await axios.post(`${type}`, data);
        return response.data;

    } catch (error) {
        throw error;
    }
}

export const getUpdate = async (data, id) => {
    try {
        const response = await axios.put(`${type}/${id}`, data);
        return response.data;

    } catch (error) {
        throw error;
    }
}



export const DeleteFunction = async (id) => {
    try {
        await axios.delete(`${type}/${id}`);
        return true;

    } catch (error) {
        console.log("error", error)
    }
}



export const updateStatus = async (id,data) => {
    try {
        const response = await axios.put(`${type}/status/${id}`, data);
        return response.data;

    } catch (error) {
        console.log("error", error)
    }
}


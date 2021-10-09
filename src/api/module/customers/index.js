import AxiosInstance from './instance'

export const getCustomers = (page = 1, size = 10) => {
    return AxiosInstance.get(`/?page=${page}&size=${size}`)
}

export const getCustomer = (uuid) => {
    if (!uuid) throw "Invalid customer"
    return AxiosInstance.get(`/${uuid}`)
}

export const createCustomer = ({ name, address, email }) => {
    return AxiosInstance.post('/', {
        name, address, email
    })
}

export const deleteCustomer = (uuid) => {
    if (!uuid) throw "Invalid customer"
    return AxiosInstance.delete(`/${uuid}`)
}

export const updateCustomer = ({ uuid, name, address }) => {
    return AxiosInstance.put(`/${uuid}`, {
        name, address
    })
}
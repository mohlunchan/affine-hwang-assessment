import AxiosInstance from './instance'

export const getCustomers = () => {
    return AxiosInstance.get('/')
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
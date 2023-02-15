import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const setToken = (newToken) => {
    axios.defaults.headers.common['Authorization'] = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject)
    return response.data
}

const update = async (id, newObject) => {
    const request = await axios.put(`${baseUrl}/${id}`, newObject)
    return request.data
}

const remove = async (id) => {
    const request = await axios.delete(`${baseUrl}/${id}`)
    return request
}

const createComment = async (id, content) => {
    const response = await axios.post(`${baseUrl}/${id}/comments`, content)
    return response.data
}


export default {
    getAll,
    setToken,
    update,
    create,
    remove,
    createComment
}
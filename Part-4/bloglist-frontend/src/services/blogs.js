import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const create = async newObject => {
    const config = {
        headers: {Authorization: token}
    }
    const res = await axios.post(baseUrl, newObject, config)
    return res.data
}

const update = (newObject) => {
    const req = axios.put(`${baseUrl}/${newObject.id}`, newObject)
    return req.then(res => res.data)
}

const remove = async (blog) => {
    const config = {
        headers: {Authorization: token}
    }
    const deletedBlog = await axios.delete(`${baseUrl}/${blog.id}`, config)
    return deletedBlog.data
  }

const getOne = async (blog) => {
    const res = await axios.get(`${baseUrl}/${blog.id}`, blog)
    return res.data
}

const addComment = async (id, comment) => {
    const res = await axios.post(`${baseUrl}/${id}/comments`, {comment})
    return res.data
}

export default { getAll, create, update, setToken, remove, getOne, addComment}
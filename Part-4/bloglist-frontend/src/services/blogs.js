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

const update = (id, newObject) => {
    const req = axios.put(`${baseUrl}/${id}`, newObject)
    return req.then(res => res.data)
}

const remove = async id => {
    const config = {
        headers: {Authorization: token}
    }
    const deletedBlog = await axios.delete(`${baseUrl}/${id}`, config)
    return deletedBlog.data
  }

export default { getAll, create, update, setToken,  remove}
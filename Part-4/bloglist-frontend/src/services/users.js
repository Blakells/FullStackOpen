import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const createUser = async (newObj) => {
    const res = await axios.post(baseUrl, newObj)
    return res.data
}
export default {getAll, createUser}
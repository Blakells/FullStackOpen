import axios from 'axios'

const api = process.env.REACT_APP_API_KEY
const url = 'http://api.weatherstack.com'

const makeCityReq = city => 
    `${url}/current?access_key=${api}&query=${city}`

const getCityWeather = async city => {
        const req = axios.get(makeCityReq(city))
        const res = await req
    return res.data
    }

export default {getCityWeather}
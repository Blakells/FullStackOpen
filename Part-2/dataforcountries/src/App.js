import React, {useState, useEffect} from 'react'
import Countries from './components/Countries'
import CountryFilter from './components/CountryFilter'
import axios from 'axios'

const countriesUrl = 'http://restcountries.eu/rest/v2/all'

const App = () => {
    const [countriesFilter, setCountriesFilter] = useState('')
    const [countries, setCountries] = useState([])

    const filtered = countries.filter((country) => {
        if (countriesFilter.length > 0) 
        return country.name.search(new RegExp(countriesFilter, 'i')) >=0
    })

    useEffect(() => {
        console.log('effect being used')
        axios
        .get(countriesUrl)
        .then(res => {
            setCountries(res.data)
        })
    }, [])

    const handleInputChange = (event) => {
        console.log(event.target.value)
        setCountriesFilter(event.target.value)
    }


    return (
        <>
        <CountryFilter onChange={handleInputChange} value={countriesFilter}/>
        <Countries countries={filtered} changeCountry={setCountriesFilter}/>
        </>
    )
}

export default App
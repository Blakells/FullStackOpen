import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from '../node_modules/axios'
const api_key = process.env.REACT_API_KEY

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    axios
    .get('http://restcountries.eu/rest/v2/all')
    .then(res => {
      const country = res.data
      //console.log(country)
      setCountries(country)
    })
  }
  useEffect(hook, [])

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const filtered = countries.filter(country => {
    if (newFilter.length > 0) {
      return country.name.search(new RegExp(newFilter, 'i')) >= 0
    }
  })

  if (filtered.length > 10) {
    return (
      <div>
        <h3>Find Countries</h3>
        <form>
          <input onChange={handleFilterChange}/>
        </form>
        <h4>Results</h4>
      
          <p>Too Many Matches, specify another please</p>
        
      </div>
      )
  } else if (filtered.length === 1) {
    const country = filtered[0]
    return (
      <div>
        <h3>Find Countries</h3>
        <form>
          <input onChange={handleFilterChange}/>
        </form>
        <h4>Results</h4>
          <h1>{country.name}</h1>
          <p>capital: {country.capital}</p>
          <p>population: {country.population}</p>
          <h3>Languages</h3>
          {country.languages.map(lang => {
            return <p>{lang.name}</p>
          })}
          <img src={country.flag} width='150px' alt='flag'/>
      </div>
    )
  } else {
    return (
    <div>
      <h3>Find Countries</h3>
      <form>
        <input onChange={handleFilterChange}/>
      </form>
      <h4>Results</h4>
        {filtered.map((country,i) => (
          <p key={i}>
            {country.name}
            <button key = {i} onClick={() => setNewFilter(country.name)}>show</button>
            </p>
        ))}
    </div>
    )
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
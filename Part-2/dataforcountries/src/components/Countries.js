import React from 'react'
import Weather from './Weather'

const Countries = ({countries, changeCountry}) => {
 if (countries.length > 10) {
        return (
            <div>
                <p>Too many matches, please further your specifications</p>
            </div>
        )
    } else if (countries.length === 1){
        return (
            <div>
                <h1>{countries[0].name}</h1>
                 <p>capital: {countries[0].capital}</p>
                 <p>population: {countries[0].population}</p>
                 <h3>Languages</h3>
                 <ul>
                     {countries[0].languages.map(lang => {
                     return <li>{lang.name}</li>
                     })}
                 </ul>
                 <img src={countries[0].flag} width='150px' alt='flag'/>
                 <Weather city={countries[0].capital}/>
            </div>
        )
    } else if ( countries.length < 10) {
        return ( 
            <div>
                {countries.map(country => {
                   return  <p key={country.name}>
                       {country.name} 
                       <button onClick={() => {
                           changeCountry(country.name)
                        }}>show</button></p>
                })}
            </div>
        )
    }
}

export default Countries
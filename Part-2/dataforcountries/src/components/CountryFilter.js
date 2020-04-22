import React from 'react'

const CountryFilter = ({value, onChange}) => {

    return (
    <div>
        <label htmlFor='countries-search'>find countries</label>
        <input 
        type='text'
        id='countries-search'
        onChange={onChange}
        value={value}
        />
    </div>
    )
}

export default CountryFilter
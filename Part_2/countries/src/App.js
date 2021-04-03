import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Input from './components/Input'

const CountryDisplay = (props) => {
  let country = props.country
  return (
    <div>
      <span>
        <h2>{country.name}</h2> 
        <div>Capital: {country.capital}</div>
        <div>Population: {country.population}</div>
        <h3>Languages</h3>
        <ul>
          {country.languages.map(language => {
            return(<li key={language.name}>{language.name}</li>)
          })}
        </ul>
        <img alt={`${country.name} flag`} src={country.flag} style={{height: '25%', width: '25%'}}/>
      </span>
      <span>
        <WeatherDisplay country={country}/>
      </span>
    </div>
  )
}
//The only way to prevent the warning on an isolated country display + filtering too quickly would be to set all weather data in a higher state that is more persistent
//That brings it's own host of design quirks and oddities.
const WeatherDisplay = ({country}) => {
  const [data, setData] = useState([])
  const _isMounted = useRef(true)


  useEffect(() => {

    axios
    .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${country.capital}, ${country.name}`)
    .then(response => {
      if(_isMounted) 
        setData(response.data.current)
    })

    return () => {
      _isMounted.current = false 
      return(null)
    }
  }, [])

  if(data !== undefined && data.length !== 0)
    return(
      <div>
        <h3>Weather in {country.capital}</h3>
        <div>Temperature: {data.temperature} degrees celsius</div>
        <div>
          <img alt='weather logo' src={data.weather_icons[0]} />
        </div>
        <div>Wind Speed: {data.wind_speed} MPH {data.wind_dir}</div>
      </div>
    )
  else return(<p>No weather data...</p>)
}

const CountryItem = ({country}) => {
  const [showDisplay, setDisplay] = useState('false')
  const [buttonText, setButtonText] = useState('Show')

  const toggleDisplay = () => {

      
    if(showDisplay)
      setButtonText('Hide')
    else
      setButtonText('Show')

    setDisplay(!showDisplay)
  }

  if(!showDisplay)
    return (
      <span>
        <CountryDisplay country={country}>
          <button onClick={toggleDisplay}>{buttonText}</button>
          
          <WeatherDisplay country={country}/>
        </CountryDisplay>
      </span>
    )
  else {
    return (
      <span>
        {country.name} 
        <button onClick={toggleDisplay}>{buttonText}</button>
      </span>
    )
  }
}

const CountriesList = ({countries}) => {

  if(countries.length > 10) 
    return(
      <div>Too many matches, specify another filter</div>
    )
  else if(countries.length === 1)  {
    let country = countries[0]
    return(
      <div>
        <CountryDisplay country={countries[0]} />
      </div>
      
    )
  }
  else {
    return(
      countries.map(country => {
        return(
          <div key={country.name}>
            <span>
              <CountryItem  country={country}/>
            </span>
          </div>)
      })
    )
  } 
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterText, setFilterText] = useState('')
  const handleFilterChange = (event) => setFilterText(event.target.value)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const onFilterChange = (text) => {
    if(filterText !== ''){
      return(countries.filter(country => 
        (country.name.toLowerCase().includes(text.toLowerCase())))
      )
    } else return(countries)
  }
  
  return(
    <div>
      <Input name='Find Countries' value={filterText} onChange={handleFilterChange} />
      <CountriesList countries={onFilterChange(filterText)} />
    </div>
  )
}

export default App;
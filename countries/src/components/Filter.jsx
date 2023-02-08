import { useCountry } from '../hooks/useCountry'

const Filter = () => {

    
    const {country, ...content} = useCountry()
    
    return (
        <div>
            <form>
            <input {...content}  />
            </form>
            {
                country
                ? 
                <div key={country.name.official}>
                            <h2> {country.name.common}</h2>
                            <p>Capital: {country.capital}</p>
                            <p>Population: {country.population}</p>
                            <br/>
                            <img src={country.flags.png} alt='bandera' width='100px' />  
                        </div>    
                : <p>Not found ...</p>
            } 
                    
        </div>
    )
}

export { Filter }
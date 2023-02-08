import { useState, useEffect } from "react"
import axios from 'axios'

export const useCountry = () => {

    const [value, setValue] = useState('')
    const [country, setCountry] = useState(null)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        console.log(value)
        axios
            .get(`https://restcountries.com/v3.1/name/${value}?fullText=true`)
            .then(res => {
                setCountry(res.data[0])
            })
            .catch(err => console.log('country not found'))
    }, [value])


    return {
        value,
        onChange,
        country
    }

}
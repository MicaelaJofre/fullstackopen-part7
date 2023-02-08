import { useState } from 'react'

export const useField = (id) => {

    const [value, setValue] = useState('')

    const onChange = (e) => {
        setValue(e.target.value)
    }

    return {
        id,
        value,
        onChange
    }
}
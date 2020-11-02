import { useEffect, useState } from "react"
import axios from 'axios'

const useFetch = (url: string, payload: {}) => {

    const [state, setState] = useState({})

    useEffect(() => {
        axios.post(url, JSON.stringify(payload))
            .then(res => console.log(res))
    }, [])
    
}

export default useFetch
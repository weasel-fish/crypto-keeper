import { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import {COIN_API_ROOT} from '../constants'

function CurrencyPage() {
    const params = useParams()
    console.log(COIN_API_ROOT+`/products/${params.id}-USD/ticker`)
    
    
    useEffect(() => {
        fetch(COIN_API_ROOT+`/products/${params.id}-USD/ticker`)
        .then(resp => resp.json())
        .then(console.log)
    }, [])

    return (
        <>
        </>
    )
}

export default CurrencyPage
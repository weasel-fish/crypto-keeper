import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {COIN_API_ROOT} from '../constants'
import CurrencyGraph from './CurrencyGraph'

function CurrencyPage() {
    const params = useParams()
    const [cryptoData, setCryptoData] = useState<any>({})
    const [loading, setLoading] = useState(true)
    console.log(COIN_API_ROOT+`/products/${params.id}-USD/ticker`)

    useEffect(() => {
        fetch(COIN_API_ROOT+`/products/${params.id}-USD/ticker`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            setCryptoData(data)
            setLoading(false)
        })
    }, [])

    return (
        <>
            <h1>{params.name}</h1>
            <p>Current Price: {loading ? null : `$${cryptoData.price} per coin`}</p>
            <CurrencyGraph currency={params.name} id={params.id}/>
        </>
    )
}

export default CurrencyPage
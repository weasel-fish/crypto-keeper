import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {COIN_API_ROOT} from '../constants'
import CurrencyGraph from './CurrencyGraph'

function CurrencyPage() {
    const params = useParams()
    const [cryptoData, setCryptoData] = useState<any>({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string|null>(null)

    useEffect(() => {
        async function fetchTicker() {
            let resp = await fetch(COIN_API_ROOT+`/products/${params.id}-USD/ticker`)

            if(resp.ok) {
                resp.json().then(data => {
                    setCryptoData(data)
                    setLoading(false)
                })
            } else {
                resp.json().then(data => {
                    setError(`Error: ${data.message}`)
                    setLoading(false)
                })
            }
        }

        fetchTicker()
        // fetch(COIN_API_ROOT+`/products/${params.id}-USD/ticker`)
        // .then(resp => resp.json())
        // .then(data => {
        //     console.log(data)
        //     setCryptoData(data)
        //     setLoading(false)
        // })
    }, [])

    return (
        <>
            <h1>{params.name}</h1>
            {loading ? <p>Loading...</p> : !error ? `Current Price: $${cryptoData.price} per coin` : <p>Error: Data not found</p>}
            {/* Buy / Sell component */}
            {!error ? <CurrencyGraph currency={params.name} id={params.id}/> : null}
        </>
    )
}

export default CurrencyPage
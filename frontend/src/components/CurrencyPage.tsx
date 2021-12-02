import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {COIN_API_ROOT} from '../constants'
import CurrencyGraph from './CurrencyGraph'
import CurrencyAccount from './CurrencyAccount'
import {UserObj} from './App'

type CurrencyPageProps = {
    currentUser:  UserObj | null
    wallets: any | null
}

function CurrencyPage({currentUser, wallets}: CurrencyPageProps) {
    const params = useParams()
    const [cryptoData, setCryptoData] = useState<any>({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string|null>(null)
    const [thisWallet, setThisWallet] = useState(currentUser ? wallets.find((wallet: any) => wallet.currency_id == params.id): null)
    
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
    }, [])

    console.log(currentUser)
    console.log(wallets)
    console.log(thisWallet)

    let currencyData = {
        price: cryptoData.price,
        name: params.name,
        id: params.id
    }

    return (
        <>
            <h1>{params.name}</h1>
            {loading ? <p>Loading...</p> : !error ? `Current Price: $${cryptoData.price} per coin` : <p>Error: Data not found</p>}
            {currentUser ? <CurrencyAccount currencyData={currencyData} currentUser={currentUser} setThisWallet={setThisWallet} thisWallet={thisWallet}/> : null }
            {!error ? <CurrencyGraph currency={params.name} id={params.id}/> : null}
        </>
    )
}

export default CurrencyPage
import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {COIN_API_ROOT, API_ROOT} from '../constants'
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
    const [walletLoading, setWalletLoading] = useState(true)
    const [error, setError] = useState<string|null>(null)
    const [thisWallet, setThisWallet] = useState(null)
    
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

        async function fetchWallet(id: number) {
            console.log(API_ROOT+`/user_wallet/${id}/${params.id}`)
            let resp = await fetch(API_ROOT+`/user_wallet/${id}/${params.id}`)

            if(resp.ok) {
                resp.json().then(data => {
                    if(Object.keys(data).length != 0){
                        setThisWallet(data)
                    }
                    setWalletLoading(false)
                })
            } else {
                resp.json().then(data => {
                    setError(`Error: ${data.message}`)
                })
            }
        }

        if(currentUser){
            console.log('fetching wallet')
        fetchWallet(currentUser.id)
        }

        fetchTicker()
    }, [])

    let currencyData = {
        price: cryptoData.price,
        name: params.name,
        id: params.id
    }

    return (
        <div className="currencyPage">
            <h1>{params.name}</h1>
            {loading ? <p>Loading...</p> : !error ? `Current Price: $${cryptoData.price} per coin` : <p>Error: Data not found</p>}
            {!error ? <CurrencyGraph currency={params.name} id={params.id}/> : null}
            {currentUser && !walletLoading ? <CurrencyAccount currencyData={currencyData} currentUser={currentUser} setThisWallet={setThisWallet} thisWallet={thisWallet}/> : null }
        </div>
    )
}




export default CurrencyPage
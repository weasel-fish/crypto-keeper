import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {COIN_API_ROOT, API_ROOT} from '../constants'
import ErrorDisplay from './ErrorDisplay'
import CurrencyGraph from './CurrencyGraph'
import CurrencyAccount from './CurrencyAccount'
import {UserObj} from './App'

type CurrencyPageProps = {
    currentUser:  UserObj | null
}

type WalletObj = {
   id: number
   user_id: number
   currency_id: string
   amount: string
   avg_cost: string
}

function CurrencyPage({currentUser}: CurrencyPageProps) {

    const params = useParams()
    const [cryptoPrice, setCryptoPrice] = useState<number | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [walletLoading, setWalletLoading] = useState<boolean>(true)
    const [error, setError] = useState<string|null>(null)
    const [thisWallet, setThisWallet] = useState<WalletObj | null>(null)
    
    useEffect(() => {
        async function fetchTicker() {
            let resp = await fetch(COIN_API_ROOT+`/products/${params.id}-USD/ticker`)

            if(resp.ok) {
                resp.json().then(data => {
                    setCryptoPrice(data.price)
                    setLoading(false)
                })
            } else {
                resp.json().then(data => {
                    setError(data.message)
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
                        console.log(thisWallet)
                        setThisWallet(data)
                    }
                    setWalletLoading(false)
                })
            } else {
                resp.json().then(data => {
                    setError(data.message)
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
        price: cryptoPrice,
        name: params.name,
        id: params.id
    }
    

    return (
        <>
            <div id="currency-page-head">
                <h1>{params.name}</h1>
                {loading ? <p>Loading...</p> : !error ? `Current Price: $${cryptoPrice} per coin` : <ErrorDisplay error={error}/>}
            </div>
            <div id={"currency-page-container"}>
                {!error ? <CurrencyGraph id={params.id}/> : <ErrorDisplay error={error}/>}
                {currentUser && !walletLoading ? <div id='currency-page-right'><CurrencyAccount currencyData={currencyData} currentUser={currentUser} setThisWallet={setThisWallet} thisWallet={thisWallet}/> </div>: null }
            </div>
        </>
    )
}




export default CurrencyPage
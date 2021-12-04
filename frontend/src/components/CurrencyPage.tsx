import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {COIN_API_ROOT, API_ROOT} from '../constants'
import CurrencyGraph from './CurrencyGraph'
import CurrencyAccount from './CurrencyAccount'
import {UserObj} from './App'

type CurrencyPageProps = {
    currentUser:  UserObj | null
}

function CurrencyPage({currentUser}: CurrencyPageProps) {
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
        <>
            <div id="currency-page-head">
                <h1>{params.name}</h1>
                {loading ? <p>Loading...</p> : !error ? `Current Price: $${cryptoData.price} per coin` : <p>Error: Data not found</p>}
            </div>
            <div id={"currency-page-container"}>
                {!error ? <CurrencyGraph currency={params.name} id={params.id}/> : null}
                {currentUser && !walletLoading ? <div id='currency-page-right'><CurrencyAccount currencyData={currencyData} currentUser={currentUser} setThisWallet={setThisWallet} thisWallet={thisWallet}/> </div>: null }
            </div>
        </>
    )
}




export default CurrencyPage
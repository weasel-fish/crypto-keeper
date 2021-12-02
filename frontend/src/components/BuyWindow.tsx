import {ChangeEvent, SyntheticEvent, useState} from 'react'
import {API_ROOT} from '../constants'

function BuyWindow({currencyData, thisWallet, setThisWallet, setBuySellWindow, currentUser}: any) {
    const [coinCount, setCoinCount] = useState(0)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setCoinCount(parseFloat(e.target.value))
    }
    console.log(currencyData)
    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        console.log('click')
        if(coinCount > 0 && thisWallet) {
            let oldAvg = parseFloat(thisWallet.avg_cost)
            let oldAmount = parseFloat(thisWallet.amount)
            let newAvg = ((oldAmount * oldAvg) + (coinCount * currencyData.price)) / (oldAmount + coinCount)
            let newAmount = coinCount + oldAmount
            
            fetch(API_ROOT+`/user_wallets/${thisWallet.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: newAmount,
                    avg_cost: newAvg
                })
            })
            .then(resp => resp.json())
            .then(data => {
                setThisWallet(data)
                setBuySellWindow(null)
            })
        } else if (coinCount > 0) {
            fetch(API_ROOT+`/user_wallets/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: currentUser.id,
                    currency_id: currencyData.id,
                    amount: coinCount,
                    avg_cost: currencyData.price
                })
            })
            .then(resp => resp.json())
            .then(data => {
                setThisWallet(data)
                setBuySellWindow(null)
            })
        } else {
            console.log('Cant buy')
        }
    }

    console.log(thisWallet)

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Buy <input type='number' value={coinCount} onChange={handleChange}></input> coins for ${coinCount * currencyData.price}</label>
                <input type='submit' value='Submit Buy'/>
            </form>
        </>
    )
}

export default BuyWindow
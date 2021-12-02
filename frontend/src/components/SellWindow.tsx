import {ChangeEvent, SyntheticEvent, useState} from 'react'
import {API_ROOT} from '../constants'

function SellWindow({currencyData, thisWallet, setThisWallet, setBuySellWindow, currentUser}: any) {
    const [coinCount, setCoinCount] = useState(0)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setCoinCount(parseFloat(e.target.value))
    }
    
    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        console.log('click')
        if(coinCount > 0) {
            let oldAvg = parseFloat(thisWallet.avg_cost)
            let oldAmount = parseFloat(thisWallet.amount)
            let newAvg = ((oldAmount * oldAvg) - (coinCount * currencyData.price)) / (oldAmount - coinCount)
            let newAmount = oldAmount - coinCount
            
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
        } else {
            console.log('Cant sell')
        }
    }

    console.log(thisWallet)

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Sell <input type='number' max={parseFloat(thisWallet.amount)} value={coinCount} onChange={handleChange}></input> coins for ${coinCount * currencyData.price}</label>
                <input type='submit' value='Confirm Sale'/>
            </form>
        </>
    )
}

export default SellWindow
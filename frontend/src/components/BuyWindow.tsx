import {ChangeEvent, SyntheticEvent, useState} from 'react'
import {API_ROOT} from '../constants'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'

function BuyWindow({currencyData, thisWallet, setThisWallet, setBuySellWindow, currentUser}: any) {
    const [coinCount, setCoinCount] = useState(0)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setCoinCount(parseFloat(e.target.value))
    }

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
   
        if(coinCount > 0 && thisWallet) {
            console.log(thisWallet)
            let oldAvg: number
            if(!thisWallet.avg_cost){
                oldAvg = 0
            } else {
                oldAvg = parseFloat(thisWallet.avg_cost)
            }
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
            console.log('Cant buy 0 coins')
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Buy <Input type='number' inputProps={{min: 0, step: 'any'}} value={coinCount} onChange={handleChange}></Input> coins for ${coinCount ? coinCount * currencyData.price : '0'}</label>
                <Button type='submit'>Submit Buy</Button>
            </form>
        </>
    )
}

export default BuyWindow
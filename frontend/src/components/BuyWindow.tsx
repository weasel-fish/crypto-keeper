import {ChangeEvent, SyntheticEvent, useState} from 'react'
import {API_ROOT} from '../constants'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'


// This component allows a user to enter an amount (decimals are allowed) of currency to buy and add to their wallet
function BuyWindow({currencyData, thisWallet, setThisWallet, setBuySellWindow, currentUser}: any) {
    const [coinCount, setCoinCount] = useState(0)

    // handleChange updates the state controlling the input field, setting the amount of currency to buy
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setCoinCount(parseFloat(e.target.value))
    }

    // handleSubmit will either create a new wallet or update an existing wallet depending on if the user has
    // bought the given currency in the past. It calculates a new amount and a new average cost by taking into
    // account the existing amount/average cost and the new amount at the current cost. If the creation or update of the
    // wallet is successful, the returned wallet object is set to thisWallet state.
    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
   
        if(coinCount > 0 && thisWallet) {
            let oldAvg: number
            if(!thisWallet.avg_cost){
                oldAvg = 0
            } else {
                oldAvg = parseFloat(thisWallet.avg_cost)
            }
            let oldAmount = parseFloat(thisWallet.amount)
            let newAvg = ((oldAmount * oldAvg) + (coinCount * currencyData.price)) / (oldAmount + coinCount)
            let newAmount = coinCount + oldAmount
            
            fetch(`${API_ROOT}/user_wallets/${thisWallet.id}`, {
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
            fetch(`${API_ROOT}/user_wallets/`, {
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
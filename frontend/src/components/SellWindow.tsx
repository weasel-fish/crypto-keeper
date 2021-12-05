import {ChangeEvent, SyntheticEvent, useState} from 'react'
import {API_ROOT} from '../constants'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'

function SellWindow({currencyData, thisWallet, setThisWallet, setBuySellWindow}: any) {
    const [coinCount, setCoinCount] = useState(0)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setCoinCount(parseFloat(e.target.value))
    }
    
    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        
        if(coinCount > 0) {
            let oldAvg = parseFloat(thisWallet.avg_cost)
            let oldAmount = parseFloat(thisWallet.amount)
            let newAvg = ((oldAmount * oldAvg) - (coinCount * currencyData.price)) / (oldAmount - coinCount)
            let newAmount = oldAmount - coinCount
            
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
        } else {
            console.log('Cant sell 0 coins')
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Sell <Input type='number' inputProps={{max: parseFloat(thisWallet.amount), min: 0, step: 'any'}} value={coinCount} onChange={handleChange}></Input> coins for ${coinCount ? coinCount * currencyData.price: '0'}</label>
                <Button type='submit'>Confirm Sale</Button>
            </form>
        </>
    )
}

export default SellWindow
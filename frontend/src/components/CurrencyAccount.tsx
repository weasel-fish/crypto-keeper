import {UserObj} from './App'
import {useState} from 'react'
import BuyWindow from './BuyWindow'
import SellWindow from './SellWindow'
import Button from '@mui/material/Button'

type CurrencyAccountProps = {
    currentUser: UserObj
    thisWallet: any
    setThisWallet: any
    currencyData: any
}

// This component displays the amount of the given currency owned by the user, if any, and the average price paid for the
// currency. It also presents buying and selling options
function CurrencyAccount({currentUser, thisWallet, setThisWallet, currencyData}: CurrencyAccountProps) {

    const [buySellWindow, setBuySellWindow] = useState<'sell' | 'buy' | null>(null)


    // calculateChange compares the average price paid for the owned currency with the current price of the currency and
    // constructs a string to communicate the % gain or loss, if any.
    function calculateChange(avgCost: number, currentPrice: number) {
        let ratio = currentPrice / avgCost
        let change
        if(ratio > 1) {
            change = `a ${((ratio - 1)*100).toFixed(2)}% gain`
        } else if (ratio < 1) {
            change = `a ${((1-ratio)*100).toFixed(2)}% loss`
        } else {
            change = 'no loss or gain'
        }

        return change
    }
    // Buy and Sell buttons, when clicked, will render the BuyWindow and SellWindow components respectively. The Sell button
    // is only enabled if the user owns more than 0 of the currency. A Cancel button will close whichever window is open.
    return (
        <div id="account">
            {thisWallet?.amount > 0 ? <p>You have {parseFloat(thisWallet.amount)} coins of {currencyData.name} at an average cost of ${parseFloat(thisWallet.avg_cost).toFixed(2)}/coin for {calculateChange(thisWallet.avg_cost, currencyData.price)} </p>:null}
            {!buySellWindow ? 
                <>
                    <Button size='large' onClick={()=>setBuySellWindow('buy')}>Buy</Button>
                    <Button size='large' disabled={thisWallet?.amount <= 0 || thisWallet == null} onClick={()=>setBuySellWindow('sell')}>Sell</Button>
                </>
                : 
                    <Button size='large' onClick={()=>setBuySellWindow(null)}>Cancel</Button>}
            {buySellWindow ? buySellWindow == 'buy' ? <BuyWindow currencyData={currencyData} thisWallet={thisWallet} setThisWallet={setThisWallet} setBuySellWindow={setBuySellWindow} currentUser={currentUser}/>: <SellWindow currencyData={currencyData} thisWallet={thisWallet} setThisWallet={setThisWallet} setBuySellWindow={setBuySellWindow} currentUser={currentUser}/> : null}
        </div>
    )
}

export default CurrencyAccount
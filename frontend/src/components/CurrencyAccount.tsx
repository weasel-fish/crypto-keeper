import {UserObj} from './App'
import {useState} from 'react'
import BuyWindow from './BuyWindow'
import SellWindow from './SellWindow'

type CurrencyAccountProps = {
    currentUser: UserObj
    thisWallet: any
    setThisWallet: any
    currencyData: any
}

function CurrencyAccount({currentUser, thisWallet, setThisWallet, currencyData}: CurrencyAccountProps) {

    const [buySellWindow, setBuySellWindow] = useState<'sell' | 'buy' | null>(null)

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

    return (
        <>
            {thisWallet ? <p>You have {parseFloat(thisWallet.amount)} coins of {currencyData.name} at an average cost of ${parseFloat(thisWallet.avg_cost).toFixed(2)}/coin for {calculateChange(thisWallet.avg_cost, currencyData.price)} </p>:null}
            {!buySellWindow ? 
                <>
                    <button onClick={()=>setBuySellWindow('buy')}>Buy</button>
                    <button disabled={!thisWallet} onClick={()=>setBuySellWindow('sell')}>Sell</button>
                </>
                : 
                    <button onClick={()=>setBuySellWindow(null)}>Cancel</button>}
            {buySellWindow ? buySellWindow == 'buy' ? <BuyWindow currencyData={currencyData} thisWallet={thisWallet} setThisWallet={setThisWallet} setBuySellWindow={setBuySellWindow} currentUser={currentUser}/>: <SellWindow currencyData={currencyData} thisWallet={thisWallet} setThisWallet={setThisWallet} setBuySellWindow={setBuySellWindow} currentUser={currentUser}/> : null}
        </>
    )
}

export default CurrencyAccount
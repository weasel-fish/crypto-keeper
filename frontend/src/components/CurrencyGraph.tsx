import {useEffect, useState } from 'react'

type CurrGraphProps = {
    currency: string | undefined;
    id: string | undefined;
}

function CurrencyGraph({currency, id}: CurrGraphProps) {

    const defaultParams = makeDateParams()
    const [candleParams, setCandleParams] = useState(defaultParams)
    const [candleData, setCandleData] = useState([])

    useEffect(() => {
        fetch(`https://api.exchange.coinbase.com/products/${id}-USD/candles?granularity=${candleParams.granularity}&start=2021-11-29T${candleParams.startHour}%3A${candleParams.startMin}%3A${candleParams.startSec}&end=${candleParams.endDate}T${candleParams.endHour}%3A${candleParams.endMin}%3A${candleParams.endSec}`)
        .then(resp => resp.json())
        .then(setCandleData)
    }, [])

    return (
        <>
            <p>Hello I am a graph of {currency}</p>
        </>
    )
}
 
function makeDateParams() {
    let currentDateTime = new Date().toISOString()

    let currentDate = currentDateTime.split('T')[0]
    let dayEarlier = currentDate.split('-')[2]

    let currentTimeArray = currentDateTime.split('T')[1].split('.')[0].split(':')
    let currentHour = currentTimeArray[0]
    let currentMin = currentTimeArray[1]
    let currentSec = currentTimeArray[2]
    let granularity = 3600

    let dateParams = {
        endDate: currentDate,
        startDate: dayEarlier,
        endHour: currentHour,
        startHour: currentHour,
        endMin: currentMin,
        startMin: currentMin,
        endSec: currentSec,
        startSec: currentSec,
        granularity
    }
    
    return dateParams
}

export default CurrencyGraph
import {useEffect, useState } from 'react'

type CurrGraphProps = {
    currency: string | undefined;
    id: string | undefined;
}

function CurrencyGraph({currency, id}: CurrGraphProps) {

    const defaultParams = makeDateParams()
    const [candleParams, setCandleParams] = useState(defaultParams)
    const [candleData, setCandleData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`https://api.exchange.coinbase.com/products/${id}-USD/candles?granularity=${candleParams.granularity}&start=${candleParams.startDate}T${candleParams.startHour}%3A${candleParams.startMin}%3A${candleParams.startSec}&end=${candleParams.endDate}T${candleParams.endHour}%3A${candleParams.endMin}%3A${candleParams.endSec}`)
        .then(resp => resp.json())
        .then(data => {
            setCandleData(data)
            setLoading(false)
        })
    }, [])

    console.log(candleData)

    return (
        <>
            {loading ? <p>Loading...</p>:<p>Hello I am a graph of {currency}</p>}
        </>
    )
}
 
function makeDateParams() {

    let endDateTime = new Date()
    let startDateTime = new Date(endDateTime.getTime())
    startDateTime.setDate(endDateTime.getDate() - 1)

    let endDate = endDateTime.toISOString().split('T')[0]
    let startDate = startDateTime.toISOString().split('T')[0]
    let currentTimeArray = startDateTime.toISOString().split('T')[1].split('.')[0].split(':')
    let currentHour = currentTimeArray[0]
    let currentMin = currentTimeArray[1]
    let currentSec = currentTimeArray[2]
    let granularity = 3600

    let dateParams = {
        endDate,
        startDate,
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
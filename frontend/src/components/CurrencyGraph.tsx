import {useEffect, useState } from 'react'
import CandlestickChart from './CandlestickChart'

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
            setCandleData(convertCandleData(data))
            setLoading(false)
        })
    }, [])

    console.log(candleData)

    function convertCandleData(data: any) {
        let converted = data.map((array: any) => {
            return {
                x: new Date(array[0]*1000),
                y: [array[1], array[2], array[3], array[4]]
            }
        })
        return converted
    }

    return (
        <>
            {loading ? <p>Loading...</p>:<CandlestickChart candles={candleData}/>}
        </>
    )
}
 
function makeDateParams() {

    let endDateTime = new Date()
    let startDateTime = new Date(endDateTime.getTime())
    console.log(endDateTime)
    startDateTime.setDate(endDateTime.getDate() - 1)
    console.log(startDateTime)

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
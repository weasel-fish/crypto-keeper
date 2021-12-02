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
    const [error, setError] = useState<string|null>(null)

    useEffect(() => {

        async function fetchCandles() {
            let resp = await fetch(`https://api.exchange.coinbase.com/products/${id}-USD/candles?granularity=${candleParams.granularity}&start=${candleParams.startDate}T${candleParams.startHour}%3A${candleParams.startMin}%3A${candleParams.startSec}&end=${candleParams.endDate}T${candleParams.endHour}%3A${candleParams.endMin}%3A${candleParams.endSec}`)

            if(resp.ok){
                resp.json().then(data => {
                    setCandleData(convertCandleData(data))
                    setLoading(false)
                })
            } else {
                resp.json().then(data => {
                    setError(`Error: ${data.message}`)
                    setLoading(false)
                })
            }
        }

        fetchCandles()

        // fetch(`https://api.exchange.coinbase.com/products/${id}-USD/candles?granularity=${candleParams.granularity}&start=${candleParams.startDate}T${candleParams.startHour}%3A${candleParams.startMin}%3A${candleParams.startSec}&end=${candleParams.endDate}T${candleParams.endHour}%3A${candleParams.endMin}%3A${candleParams.endSec}`)
        // .then(resp => {
        //     console.log(resp.status)
        //     return resp.json()
        // })
        // .then(data => {
        //     setCandleData(convertCandleData(data))
        //     setLoading(false)
        // })
    }, [])

    console.log(candleData)

    return (
        <>
            {loading ? <p>Loading...</p>: !error ? <CandlestickChart candles={candleData}/> : <p>{error}</p>}
        </>
    )
}

// Coinbase: low, high, open, close
// Chart: open, high, low, close

function convertCandleData(data: any) {
    let converted = data.map((array: any) => {
        return {
            x: formatDate(new Date(array[0]*1000)),
            y: [array[3], array[2], array[1], array[4]]
        }
    })
    return converted.reverse()
}

function formatDate(date: Date) {
    let day = date.toLocaleDateString()
    let time = date.toLocaleTimeString().replace(':00 ', ' ')
    
    return day + ' ' + time
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
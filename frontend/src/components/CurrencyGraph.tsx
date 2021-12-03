import {ChangeEvent, useEffect, useState } from 'react'
import CandlestickChart from './CandlestickChart'

type CurrGraphProps = {
    currency: string | undefined;
    id: string | undefined;
}

function CurrencyGraph({currency, id}: CurrGraphProps) {

    const [candleData, setCandleData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string|null>(null)
    // const [rangeOption, setRangeOption] = useState('24')
    // const defaultParams = makeDateParams(rangeOption)
    const [candleParams, setCandleParams] = useState(makeDateParams('24'))

    useEffect(() => {
        setLoading(true)
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
    }, [candleParams])

    function handleRangeChange(e: ChangeEvent<any>) {
        setCandleParams(makeDateParams(e.target.value))
    }

    return (
        <>
            <select onChange={handleRangeChange}>
                <option selected value='24'>Last 24 Hours</option>
                <option value='30'>Last 30 Days</option>
                <option value='6'>Last 6 Months</option>
            </select>
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
 
function makeDateParams(range: string) {

    let daysPrior
    let granularity

    switch(range) {
        case '24':
            daysPrior = 1
            granularity = 3600
            break
        case '30':
            daysPrior = 30
            granularity = 86400
            break
        case '6':
            daysPrior = 180
            granularity = 86400
            break
        default:
            daysPrior = 1
            granularity = 3600
    }
    
    let endDateTime = new Date()
    let startDateTime = new Date(endDateTime.getTime())

    startDateTime.setDate(endDateTime.getDate() - daysPrior)

    // I think some of this is redundant, can clean it up!
    let endDate = endDateTime.toISOString().split('T')[0]
    let startDate = startDateTime.toISOString().split('T')[0]
    let currentTimeArray = startDateTime.toISOString().split('T')[1].split('.')[0].split(':')
    let currentHour = currentTimeArray[0]
    let currentMin = currentTimeArray[1]
    let currentSec = currentTimeArray[2]

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
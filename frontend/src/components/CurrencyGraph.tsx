import { useEffect, useState } from 'react'
import { COIN_API_ROOT } from '../constants'
import CandlestickChart from './CandlestickChart'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent} from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import ErrorDisplay from './ErrorDisplay'

type CurrGraphProps = {
    id: string | undefined
}

export type CandleData = {
    x: string
    y: number[]
}

type DateParams = {
    endDate: string
    startDate: string
    endHour: string
    startHour: string
    endMin: string
    startMin: string
    endSec: string
    startSec: string
    granularity: number
}

function CurrencyGraph({ id }: CurrGraphProps) {

    const [candleData, setCandleData] = useState<CandleData[] | []>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string|null>(null)
    const [candleParams, setCandleParams] = useState<DateParams>(makeDateParams('24'))


    // On initial render, a request is made to the Coinbase API for candle data using parameters generated
    // by the makeDateParams function, with the default being the past 24 hours. The resulting data is then converted
    // into a useable format and saved to state (candleData). candleData is passed down to the CandlestickChart component
    useEffect(() => {
        setLoading(true)
        async function fetchCandles() {
            let resp = await fetch(`${COIN_API_ROOT}/products/${id}-USD/candles?granularity=${candleParams.granularity}&start=${candleParams.startDate}T${candleParams.startHour}%3A${candleParams.startMin}%3A${candleParams.startSec}&end=${candleParams.endDate}T${candleParams.endHour}%3A${candleParams.endMin}%3A${candleParams.endSec}`)

            if(resp.ok){
                resp.json().then((data: number[][]) => {
                    setCandleData(convertCandleData(data))
                    setLoading(false)
                })
            } else {
                resp.json().then(data => {
                    setError(data.message)
                    setLoading(false)
                })
            }
        }

        fetchCandles()
    }, [candleParams])

    // handleRangeChange updates the state that is used to fill out the url request for the currency's candle data.
    // It updates whenever a new time period is selected from the dropdown menu and passes that choice to the makeDataParams function
    function handleRangeChange(e: SelectChangeEvent) {
        setCandleParams(makeDateParams(e.target.value))
    }

    return (
        <>
            <div id='candlestick-period'>
                <InputLabel>Time Period</InputLabel>
                <Select defaultValue={'24'} onChange={handleRangeChange}>
                    <MenuItem value='24'>Last 24 Hours</MenuItem>
                    <MenuItem value='30'>Last 30 Days</MenuItem>
                    <MenuItem value='6'>Last 6 Months</MenuItem>
                </Select>
                {loading ? <p>Loading...</p>: !error ? <CandlestickChart candles={candleData}/> : <ErrorDisplay error={error}/>}
            </div>
        </>
    )
}

// convertCandleData converts the data received from Coinbase (which is in the format of [timestamp, low, high, open, close])
// to the format used by ApexCharts ({x: timestamp, y: [low, high, open, close]}). It also translates the unix timestamp
// received from Coinbase into the milliseconds used by ApexCharts
function convertCandleData(data: number[][]):CandleData[] {
    let converted = data.map((array: number[]) => {
        return {
            x: formatDate(new Date(array[0]*1000)),
            y: [array[3], array[2], array[1], array[4]]
        }
    })
    return converted.reverse()
}

// formatDate creates a new string for ApexCharts x-axis labels in the form of MN/DY/YEAR 00:00 AM/PM
function formatDate(date: Date):string {
    let day:string = date.toLocaleDateString()
    let time: string = date.toLocaleTimeString().replace(':00 ', ' ')
    
    return day + ' ' + time
}


// makeDateParams handles the parsing of date ranges and granularity based on the selected time period. It creates an
// object with all the necessary parameters that are then injected into the candle fetch request to the Coinbase API.
function makeDateParams(range: string): DateParams {

    let daysPrior: number
    let granularity: number

    switch(range) {
        case '24':
            daysPrior = 1
            granularity = 900
            break
        case '30':
            daysPrior = 30
            granularity = 21600
            break
        case '6':
            daysPrior = 180
            granularity = 86400
            break
        default:
            daysPrior = 1
            granularity = 3600
    }
    
    let endDateTime: Date = new Date()
    let startDateTime: Date = new Date(endDateTime.getTime())

    startDateTime.setDate(endDateTime.getDate() - daysPrior)

    let endDate = endDateTime.toISOString().split('T')[0]
    let startDate = startDateTime.toISOString().split('T')[0]
    let currentTimeArray = startDateTime.toISOString().split('T')[1].split('.')[0].split(':')
    let currentHour = currentTimeArray[0]
    let currentMin = currentTimeArray[1]
    let currentSec = currentTimeArray[2]

    let dateParams: DateParams = {
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
import { useState } from 'react'
import Chart from 'react-apexcharts'
import {CandleData} from './CurrencyGraph'

type CandlestickChartProps = {
    candles: CandleData[]
}

function CandlestickChart({candles}: CandlestickChartProps) {

    const [candleData, setCandleData] = useState(candles)

    const options = {
    }

    let seriesData = [{
        data: candleData
    }]

    return (
        <div id='candlestick-chart'>
            <Chart 
                options={options}
                series={seriesData}
                type='candlestick'
                height='500'
                width='600'
            />
        </div>
    )
}

export default CandlestickChart
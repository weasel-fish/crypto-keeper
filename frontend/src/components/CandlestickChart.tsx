import { useState } from 'react'
import Chart from 'react-apexcharts'

function CandlestickChart({candles}: any) {

    const [candleData, setCandleData] = useState(candles)

    const options = {}

    let seriesData = [{
        data: candleData
    }]
    
    return (
        <>
            <Chart 
                options={options}
                series={seriesData}
                type='candlestick'
                height='500'
                width='600'
            />
        </>
    )
}

export default CandlestickChart
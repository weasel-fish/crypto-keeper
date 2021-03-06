import Chart from 'react-apexcharts'
import {CandleData} from './CurrencyGraph'

type CandlestickChartProps = {
    candles: CandleData[]
}

// This component takes in the formatted candle data generated by CurrencyGraph and passes it into the Chart component
// of the ApexCharts library. This produces a cool interactive chart displaying price history!

function CandlestickChart({candles}: CandlestickChartProps) {

    const options = {
    }

    let seriesData = [{
        data: candles
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
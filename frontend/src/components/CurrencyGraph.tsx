import {useEffect, useState } from 'react'

type CurrGraphProps = {
    currency: string | undefined;
    id: string | undefined;
}

function CurrencyGraph({currency, id}: CurrGraphProps) {
    let currentDateTime = new Date().toISOString()
    let currentDate = currentDateTime.split('T')[0]
    console.log(currentDate)
    let dayEarlier = currentDate.split('-')[2]
    let currentTimeArray = currentDateTime.split('T')[1].split('.')[0].split(':')
    let currentHour = currentTimeArray[0]
    let currentMin = currentTimeArray[1]
    let currentSec = currentTimeArray[2]
    let granularity = 3600
    

    useEffect(() => {
        fetch(`https://api.exchange.coinbase.com/products/${id}-USD/candles?granularity=${granularity}&start=2021-11-29T${currentHour}%3A${currentMin}%3A${currentSec}&end=${currentDate}T${currentHour}%3A${currentMin}%3A${currentSec}`)
        .then(resp => resp.json())
        .then(console.log)
    }, [])



    let sample: string = 'https://api.exchange.coinbase.com/products/${id}-USD/candles?granularity=${granularity}&start=${yearMonthDay}T${hour}%3A${min}%3A${sec}&end=${yearMonthDay}T${hour}%3A${min}%3A${sec}'
    let example: string = 'https://api.exchange.coinbase.com/products/BTC-USD/candles?granularity=3600&start=2021-11-29T12%3A00%3A00&end=2021-11-30T12%3A00%3A00'

    return (
        <>
            <p>Hello I am a graph of {currency}</p>
        </>
    )
}

export default CurrencyGraph
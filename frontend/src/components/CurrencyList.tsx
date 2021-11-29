import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import { COIN_API_ROOT } from "../constants"

function CurrencyList() {

    const [currencies, setCurrencies] = useState<any[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch(COIN_API_ROOT+'/currencies')
        .then(resp => resp.json())
        .then(setCurrencies)
    }, [])

    function handleClick(id: string) {
        navigate(`/currency/${id}`)
    }

    console.log(currencies)
    return (
        <>
            {currencies.map(curr => <p onClick={() => handleClick(curr.id)}>{curr.name + ' | ' + curr.id}</p>)}
        </>
    )
}

export default CurrencyList
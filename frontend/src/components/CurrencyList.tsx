import { ChangeEvent, useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import { COIN_API_ROOT } from "../constants"

function CurrencyList() {

    const [currencies, setCurrencies] = useState<any[]>([])
    const [searchText, setSearchText] = useState<string>('')
    const navigate = useNavigate()

    useEffect(() => {
        fetch(COIN_API_ROOT+'/currencies')
        .then(resp => resp.json())
        .then(setCurrencies)
    }, [])

    function handleClick(name: string, id: string) {
        navigate(`/currency/${name}(${id})`)
    }

    function handleSearch(e: ChangeEvent<any>){
        setSearchText(e.target.value)
    }

    const filteredCurrencies = currencies.filter(curr => curr.name.toLowerCase().includes(searchText.toLowerCase()) || curr.id.toLowerCase().includes(searchText.toLowerCase()))

    return (
        <>  
            <label>Search:<input type='text' value={searchText} onChange={handleSearch}></input></label>
            {filteredCurrencies.map(curr => <p onClick={() => handleClick(curr.name, curr.id)}>{curr.name + ' | ' + curr.id}</p>)}
        </>
    )
}

export default CurrencyList
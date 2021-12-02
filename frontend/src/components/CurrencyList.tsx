import { ChangeEvent, useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import { COIN_API_ROOT } from "../constants"

function CurrencyList() {

    const [currencies, setCurrencies] = useState<any[]>([])
    const [searchText, setSearchText] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string|null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchCurrencyList() {
            let resp = await fetch(COIN_API_ROOT+'/currencies')

            if(resp.ok) {
                resp.json().then(data => {
                    setCurrencies(data)
                    setLoading(false)
                    })
            } else {
                resp.json().then(data => {
                    setError(`Error: ${data.message}`)
                    setLoading(false)
                    })
            }
        }
        fetchCurrencyList()
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
            {loading ? <p>Loading...</p> : !error ? filteredCurrencies.map(curr => <p onClick={() => handleClick(curr.name, curr.id)}>{curr.name + ' | ' + curr.id}</p>) : <p>{error}</p>}
        </>
    )
}

export default CurrencyList
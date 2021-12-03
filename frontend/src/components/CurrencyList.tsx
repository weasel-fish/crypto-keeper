import { ChangeEvent, useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import { COIN_API_ROOT } from "../constants"

function CurrencyList() {

    const [currencies, setCurrencies] = useState<any[]>([])
    const [searchText, setSearchText] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string|null>(null)
    const [sortAlpha, setSortAlpha] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchCurrencyList() {
            let resp = await fetch(COIN_API_ROOT+'/currencies')

            if(resp.ok) {
                resp.json().then(data => {
                    setCurrencies(sortCurrencies(data, sortAlpha))
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

    function sortCurrencies(data:any[], type:boolean){
        if(type) {
            return data.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
        } else {
            return data.sort((a, b) => a.details.sort_order < b.details.sort_order ? -1 : a.details.sort_order > b.details.sort_order ? 1 : 0)
        }
    }

    const sortedCurrencies:any = sortCurrencies(currencies, sortAlpha)
    const filteredCurrencies = sortedCurrencies.filter((curr :any) => curr.name.toLowerCase().includes(searchText.toLowerCase()) || curr.id.toLowerCase().includes(searchText.toLowerCase()))

    return (
        <>  
            <label>Search:<input type='text' value={searchText} onChange={handleSearch}></input></label>
            <label>Sort by:</label><button onClick={() => setSortAlpha(!sortAlpha)}>{!sortAlpha ? 'Alphabetical Order':'Popularity'}</button>
            {loading ? <p>Loading...</p> : !error ? filteredCurrencies.map((curr:any) => <p onClick={() => handleClick(curr.name, curr.id)}>{curr.name + ' | ' + curr.id}</p>) : <p>{error}</p>}
        </>
    )
}

export default CurrencyList
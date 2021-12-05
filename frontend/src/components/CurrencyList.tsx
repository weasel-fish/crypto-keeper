import { ChangeEvent, useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import { COIN_API_ROOT } from "../constants"
import ErrorDisplay from './ErrorDisplay'
import Button from '@mui/material/Button'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton'
import Input from '@mui/material/Input'

type CurrencyObj = {
    [key: string]: any
}

// This component renders and populates a list of currencies pulled from the Coinbase API. The list is sortable by
// alphabetical or popularity order. It is also searchable by name or symbol.

function CurrencyList() {

    const [currencies, setCurrencies] = useState<CurrencyObj[] | []>([])
    const [searchText, setSearchText] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string|null>(null)
    const [sortAlpha, setSortAlpha] = useState(false) /* State controlling sort type. The default, 'false'
                                                         correlates with ordering by popularity and 
                                                         'true' correlates with alphabetical order */

    const navigate = useNavigate()


    // On initial render, a request is made to the Coinbase API for a list of currencies, which is returned in the form of an
    // array. That array is passed through the excludeMoney and sortCurrencies functions before being saved to state.
    useEffect(() => {
        async function fetchCurrencyList() {
            let resp = await fetch(COIN_API_ROOT+'/currencies')

            if(resp.ok) {
                resp.json().then(data => {
                    setCurrencies(sortCurrencies(excludeMoney(data), sortAlpha))
                    setLoading(false)
                    })
            } else {
                resp.json().then(data => {
                    setError(data.message)
                    setLoading(false)
                    })
            }
        }
        fetchCurrencyList()
    }, [])

    // excludeMoney is used to filter out three fiat currencies that I don't care about from the Coinbase list of currencies
    function excludeMoney(data:CurrencyObj[]): CurrencyObj[] {
        let noMoney: CurrencyObj[] = data.filter((curr:CurrencyObj) => curr.id != 'USD' && curr.id != 'EUR' && curr.id != 'GBP')
        return noMoney
    }

    // handleClick triggers when a listed currency is clicked on, and navigates to the currency's individual page by passing the
    // currency's id and name as parameters to the url
    function handleClick(name: string, id: string) {
        navigate(`/currency/${name}(${id})`)
    }

    // handleSearch updates the searchText state and controls search input field
    function handleSearch(e: ChangeEvent<HTMLInputElement>){
        setSearchText(e.target.value)
    }

    // sortCurrencies takes an array of currencies sorts them in either alphabetical order or by popularity,
    // based on the state 'sortAlpha' which is toggled by clicking a button
    function sortCurrencies(data:CurrencyObj[], type:boolean){
        if(type) {
            return data.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
        } else {
            return data.sort((a, b) => a.details.sort_order < b.details.sort_order ? -1 : a.details.sort_order > b.details.sort_order ? 1 : 0)
        }
    }

    const sortedCurrencies: CurrencyObj[] = sortCurrencies(currencies, sortAlpha)
    // filteredCurrencies is what eventually populates the list. This is immediately updated to reflect any changes
    // to the search field or to the sort type
    const filteredCurrencies = sortedCurrencies.filter((curr:CurrencyObj) => curr.name.toLowerCase().includes(searchText.toLowerCase()) || curr.id.toLowerCase().includes(searchText.toLowerCase()))

    return (
        <div className="currencyList">
            <div id='currency-list-organizers'>
                <Input placeholder="Search" value={searchText} onChange={handleSearch}/>
                <Button onClick={() => setSortAlpha(!sortAlpha)}>{!sortAlpha ? 'Sort By Alphabetical Order':'Sort By Popularity'}</Button>
            </div>
            {loading ? <p>Loading...</p> : !error ? 
            <List
                sx={{
                    width: '100%',
                    maxWidth: 500,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 340,
                    '& ul': { padding: 0},
                }}>
                <ul>
                    {filteredCurrencies.map((curr: CurrencyObj) =>     
                        <ListItemButton onClick={() => handleClick(curr.name, curr.id)} key={curr.id}>{curr.name + ' | ' + curr.id}</ListItemButton>
                    )}
                </ul>
            </List>
            : <ErrorDisplay error={error}/>}
        </div>
    )
}

export default CurrencyList
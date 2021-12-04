import { ChangeEvent, useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import { COIN_API_ROOT } from "../constants"
import ErrorDisplay from './ErrorDisplay'
import Button from '@mui/material/Button'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton'
import ListSubheader from '@mui/material/ListSubheader'
import Input from '@mui/material/Input'

type CurrencyObj = {
    [key: string]: any
}

function CurrencyList() {

    const [currencies, setCurrencies] = useState<CurrencyObj[] | []>([])
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

    function excludeMoney(data:CurrencyObj[]): CurrencyObj[] {
        let noMoney: CurrencyObj[] = data.filter((curr:CurrencyObj) => curr.id != 'USD' && curr.id != 'EUR' && curr.id != 'GBP')
        console.log(noMoney)
        return noMoney
    }

    function handleClick(name: string, id: string) {
        navigate(`/currency/${name}(${id})`)
    }

    function handleSearch(e: ChangeEvent<HTMLInputElement>){
        setSearchText(e.target.value)
    }

    function sortCurrencies(data:CurrencyObj[], type:boolean){
        if(type) {
            return data.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
        } else {
            return data.sort((a, b) => a.details.sort_order < b.details.sort_order ? -1 : a.details.sort_order > b.details.sort_order ? 1 : 0)
        }
    }

    const sortedCurrencies: CurrencyObj[] = sortCurrencies(currencies, sortAlpha)
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
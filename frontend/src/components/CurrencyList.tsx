import { ChangeEvent, useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import { COIN_API_ROOT } from "../constants"
import Button from '@mui/material/Button'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton'
import ListSubheader from '@mui/material/ListSubheader'
import Input from '@mui/material/Input'

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
                    setCurrencies(sortCurrencies(excludeMoney(data), sortAlpha))
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

    function excludeMoney(data:any) {
        let noMoney = data.filter((curr:any) => curr.id != 'USD' && curr.id != 'EUR' && curr.id != 'GBP')
        console.log(noMoney)
        return noMoney
    }

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
        <div className="currencyList">  
            <Input placeholder="Search" value={searchText} onChange={handleSearch}/>
            <Button onClick={() => setSortAlpha(!sortAlpha)}>{!sortAlpha ? 'Sort By Alphabetical Order':'Sort By Popularity'}</Button>
            {loading ? <p>Loading...</p> : !error ? 
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 300,
                    '& ul': { padding: 0},
                }}
            >
                {/* <ListSubheader>Currency | Symbol</ListSubheader> */}
                <ul>
                    {filteredCurrencies.map((curr:any) =>     
                        <ListItemButton onClick={() => handleClick(curr.name, curr.id)} key={curr.id}>{curr.name + ' | ' + curr.id}</ListItemButton>
                    )}
                </ul>
            </List>
            : <p>{error}</p>}
        </div>
    )
}

export default CurrencyList
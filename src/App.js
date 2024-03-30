import React, {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";
function App() {
    const [data, setData] = useState([])

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon/')
            const responseData = response.data.results
            console.log(responseData)
            const imgData = await Promise.all(responseData.map(async (pokemon) => {
                const urlData = await axios.get(pokemon.url)
                console.log(urlData)
                return urlData.data
            }))
            setData(imgData)}
        getData()
    }, []);
    return (
        <div className='pokemon'>
            {data && data.map((item, index) => (
                <div key={index} className='pokemon-item'>
                    {item.sprites && (
                        <img src={item.sprites.front_default} alt={item.name}/>
                    )}
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    )
}

export default App

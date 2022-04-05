import { useState, useEffect } from "react"

function Coin({ coin }) {
    return (
        <option name={coin.name} price={coin.quotes.USD.price}>
            {coin.name} ({coin.symbol}): {coin.quotes.USD.price}
        </option>
    )
}

function Buyable({money, coin}) {
    if (money === 0 || coin.name === undefined || coin.price === undefined)
        return <p>  </p>
    return (
        <p>You can buy {money / coin.price} {coin.name}(s).</p>
    )
}

function Content({ coins }) {
    const [money, setMoney] = useState(0)
    const [coin, setCoin] = useState({})

    return (
        <div>
            <form onSubmit={(event) => { event.preventDefault() }}>
                <input
                    value={money}
                    type="number"
                    placeholder="How much do you have?"
                    onChange={(event) => { setMoney(event.target.value) }} />
            </form>
            <select onChange={(event) => {
                for (let node of event.target.children) {
                    if (node.value === event.target.value) {
                        setCoin({
                            name: node.getAttribute("name"), 
                            price: node.getAttribute("price")
                        })
                        break
                    }
                }
            }}>
                <option>Please Select a coin</option>
                {coins.map(coin => <Coin key={coin.id} coin={coin} />)}
            </select>
            <Buyable money={money} coin={coin} />
        </div>
    )
}

function App() {
    const [loading, setLoading] = useState(true)
    const [coins, setCoins] = useState([])

    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers").then(
            res => res.json()
        ).then(json => {
            setCoins(json)
            setLoading(false)
        })
    }, [])

    return (
        <div className="App">
            <h1>Coins!{loading ? "" : ` (${coins.length})`}</h1>
            {loading ? <strong>LOADING...</strong> : <Content coins={coins} />}
        </div>
    );
}

export default App;

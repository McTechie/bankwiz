import { useEffect, useState } from "react"

const Stocks = () => {
  const [stock, setStock] = useState()
  const [finalArr, setFinalArr] = useState([])

  useEffect(() => {
    const fetchData = async (item) => {
      const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${item}&token=cfsu97hr01qgkckhmgtgcfsu97hr01qgkckhmgu0`)
      const data = await response.json()
      console.log(data)
      setFinalArr(finalArr => [...finalArr, data])
    }

    ['AAPL', 'MSFT', 'TSLA', 'NFLX', 'GME'].forEach(fetchData)
  }, [])
  console.log(finalArr)

  // console.log(stock)
  return (
    <div>

    </div>
  )
}

export default Stocks

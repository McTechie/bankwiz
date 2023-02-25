import { useEffect, useState } from 'react';
import Link from 'next/link'

const Stocks = () => {
  const [stock, setStock] = useState()
  const [finalArr, setFinalArr] = useState([])

  const token = 'cfsu97hr01qgkckhmgtgcfsu97hr01qgkckhmgu0'

  useEffect(() => {
    const fetchData = async (item) => {
      const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${item}&token=${token}`)
      const data = await response.json()
      console.log(data)
      setFinalArr(finalArr => [...finalArr, { ...data, item }])
    }

    ['AAPL', 'MSFT', 'TSLA', 'NFLX', 'GME'].forEach(fetchData)
  }, [])

  return (
    <div>
      <div className='grid grid-cols-5 h-full'>
        <div className='col-span-3 my-4 p-2 w-full'>
          <table class='table-auto border-white w-full text-left whitespace-no-wrap'>
            <thead>
              <tr>
                <th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>Name</th>
                <th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Current Price</th>
                <th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Highest Price </th>
                <th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Lowest Price </th>
                <th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br'>Add to Watchlist</th>
              </tr>
            </thead>
            <tbody>
              {finalArr.map((stock, index) => (
                <tr key={index} className=''>
                  <td class='px-4 py-3'>{stock.item}</td>
                  <td class='px-4 py-3'>{stock.c}</td>
                  <td class='px-4 py-3'>{stock.h}</td>
                  <td class='px-4 py-3'>{stock.l}</td>
                  <td class='px-4 py-3'><button className='bg-indigo-400 mx-8 p-1'>Add</button></td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
        <div className='col-span-2 my-4 mx-4 p-2 '>
          <table class='table-auto  border-white w-full ml-8 text-left whitespace-no-wrap'>
            <thead>
              <tr>
                <th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>Name</th>
                <th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br'>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className='hover:bg-indigo-300 hover:cursor-pointer'>
                <td class='px-4 py-3'><Link href='/trading'>APPL</Link></td>
                <td class='px-4 py-3'>2334</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Stocks

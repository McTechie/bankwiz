import { useEffect, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { PlusCircleIcon, PlusIcon } from '@heroicons/react/24/solid';

const Stocks = () => {
  const [stock, setStock] = useState()
  const [finalArr, setFinalArr] = useState([])
  const [watchList, setWatchList] = useState([])
  const [selectedStock, setSelectedStock] = useState('')

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

  const handleClick = (stock) => {
    setSelectedStock(stock)
    confirm('Add to watchlist')
    setWatchList(watchList => [...watchList, stock])
    alert('Item added to watchlist')
  }
  const router = useRouter()

  return (
    <div>
      <div className='grid grid-cols-5 h-full'>
        <div className='col-span-3 my-4 p-2 w-full'>
          <table class='table-auto flex flex-col h-[40rem] border-white w-full text-left whitespace-no-wrap'>
            <thead>
              <tr>
                <th class='px-8 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>Name</th>
                <th class='px-8 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Current Price</th>
                <th class='px-8 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Highest Price </th>
                <th class='px-14 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Lowest Price </th>
              </tr>
            </thead>
            <tbody className='flex-1 overflow-y-scroll'>
              {finalArr.map((stock, index) => (
                <tr className='hover:bg-sky-400 cursor-pointer' key={index}>
                  <td className='px-11 py-3'>{stock.item}</td>
                  <td className='px-11 py-3'>{stock.c}</td>
                  <td className='px-11 py-3'>{stock.h}</td>
                  <td className='px-11 py-3'>{stock.l}</td>
                  <td onClick={() => handleClick(stock)} className=''><PlusCircleIcon className='h-5 w-5' /></td>
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
                <th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br'>Current Price</th>
              </tr>
            </thead>
            <tbody>
              {watchList.length > 0 ? watchList.map((stock, index) => (
                <tr key={index} onClick={router.push(`/investments/${stock.item}`)} className='hover:bg-sky-400'>
                  <td class='px-4 py-3 w-full'>{stock.item}</td>
                  <td class='px-4 py-3 w-full'>{stock.c}</td>
                </tr>)) :
                <div className='mx-auto mt-10 text-lg'>Add items to  your watchlist</div>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Stocks

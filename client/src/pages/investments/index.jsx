// named imports
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MinusCircleIcon, PlusCircleIcon, PlusIcon } from '@heroicons/react/24/solid'

import Link from 'next/link'
import { useRouter } from 'next/router';
import { PlusCircleIcon, PlusIcon } from '@heroicons/react/24/solid';

const INVESTMENTS_TOKEN = 'cfsu97hr01qgkckhmgtgcfsu97hr01qgkckhmgu0'

const Stocks = () => {
  const router = useRouter()

  const [finalArr, setFinalArr] = useState([])
  const [watchList, setWatchList] = useState([])

  useEffect(() => {
    const fetchData = async (item) => {
      const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${item}&token=${INVESTMENTS_TOKEN}`)
      const data = await response.json()
      console.log(data)
      setFinalArr(finalArr => [...finalArr, { ...data, item }])
    }

    ['AAPL', 'MSFT', 'TSLA', 'NFLX', 'GME'].forEach(fetchData)
  }, [])

  const handleAddStockToWatchList = (e, stock) => {
    e.stopPropagation()

    setWatchList(watchList => {
      if (watchList.includes(stock)) {
        return watchList
      } else {
        return [...watchList, stock]
      }
    })

    localStorage.setItem('watchListInvestments', JSON.stringify([...watchList, stock]))
  }

  const handleRemoveStockFromWatchList = (e, stock) => {
    e.stopPropagation()

    const newWatchList = watchList.filter(item => item !== stock)

    setWatchList(newWatchList)

    localStorage.setItem('watchListInvestments', JSON.stringify(newWatchList))
  }

  useEffect(() => {
    const watchList = JSON.parse(localStorage.getItem('watchListInvestments'))

    if (watchList) {
      setWatchList(watchList)
    }
  }, [])

  return (
    <div className='max-w-screen-xl mx-auto'>
      <div className='flex justify-between items-center mx-10 mb-5'>
        <h1 className='text-3xl font-semibold'>
          Investments
        </h1>
      </div>

      {/* currency listing */}
      <div className='grid grid-cols-12 gap-x-10 mx-10'>
        <div className='col-span-9'>
          <table className='flex flex-col border p-6 border-sky-400 dark:border-indigo-400 rounded-lg text-center h-[38rem]'>
            <thead>
              <tr className='grid grid-cols-12 py-2 font-medium text-gray-900 text-sm bg-gray-300'>
                <th className='col-span-3'>
                  Name
                </th>
                <th className='col-span-3'>
                  Current Price
                </th>
                <th className='col-span-3'>
                  Highest Price
                </th>
                <th className='col-span-2'>
                  Lowest Price
                </th>
              </tr>
            </thead>
            <tbody className='flex-1 overflow-y-auto'>
              {finalArr?.map((stock, index) => (
                <tr
                  key={index}
                  className='hover:bg-sky-400 group cursor-pointer grid grid-cols-12 py-2 border-b-2 border-sky-400'
                >
                  <td className='col-span-3'>{stock.item}</td>
                  <td className='col-span-3 text-slate-300'>{stock.c}</td>
                  <td className='col-span-3 text-emerald-300'>{stock.h}</td>
                  <td className='col-span-2 text-rose-300'>{stock.l}</td>
                  <td className='col-span-1'>
                    <button onClick={(e) => handleAddStockToWatchList(e, stock.item)}>
                      <PlusCircleIcon className='h-6 w-6 text-sky-400 group-hover:text-slate-600' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='col-span-3 flex flex-col space-y-10'>
          <table className='border p-4 border-sky-400 dark:border-indigo-400 h-[18rem] rounded-lg flex flex-col text-center overflow-auto'>
            <thead>
              <tr className='grid grid-cols-12 py-2 font-medium text-gray-900 text-sm bg-gray-300'>
                <th className='col-span-10'>
                  Favorite Stocks
                </th>
              </tr>
            </thead>
            <tbody className='flex-1 overflow-y-scroll'>
              {watchList.length > 0 ? watchList.map(stock => (
                <tr
                  key={stock}
                  onClick={() => router.push(`/investments/${stock}`)}
                  className='hover:bg-sky-400 cursor-pointer grid grid-cols-12 py-2 border-b-2 border-sky-400 group'
                >
                  <td className='col-span-10'>{stock}</td>
                  <td className='col-span-2'>
                    <button onClick={(e) => handleRemoveStockFromWatchList(e, stock)}>
                      <MinusCircleIcon className='h-6 w-6 text-sky-400 group-hover:text-slate-600' />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td className='col-span-12 opacity-60 align-middle'>
                    No Stocks added to favorites...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Stocks


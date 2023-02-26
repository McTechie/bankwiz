// named imports
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid'

const FOREIGN_EXCHANGE_API_KEY = '70e28d22944f57e5ba6c3ad4'

const Foreign = () => {
  const router = useRouter()

  const [alias, setAlias] = useState('INR')
  const [conversionRates, setConversionRates] = useState({})
  const [watchList, setWatchList] = useState([])

  const allCurrencies = Object.keys(conversionRates)
  const popularCurrencies = Object.keys(conversionRates).filter(currency => ['USD', 'INR', 'EUR', 'AED'].includes(currency))

  useEffect(() => {
    const fetchCurrencies = async () => {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${FOREIGN_EXCHANGE_API_KEY}/latest/${alias}`)

      const { conversion_rates } = await response.json()

      setConversionRates(conversion_rates)
    }

    fetchCurrencies()
  }, [alias])

  const handleAddCurrencyToWatchList = (e, currency) => {
    e.stopPropagation()

    setWatchList(watchList => {
      if (watchList.includes(currency)) {
        return watchList
      } else {
        return [...watchList, currency]
      }
    })

    localStorage.setItem('watchListStocks', JSON.stringify([...watchList, currency]))
  }

  const handleRemoveCurrencyFromWatchList = (e, currency) => {
    e.stopPropagation()

    const newWatchList = watchList.filter(item => item !== currency)

    setWatchList(newWatchList)

    localStorage.setItem('watchListStocks', JSON.stringify(newWatchList))
  }

  useEffect(() => {
    const watchList = JSON.parse(localStorage.getItem('watchList'))

    if (watchList) {
      setWatchList(watchList)
    }
  }, [])

  return (
    <div className='max-w-screen-xl mx-auto'>
      <div className='flex justify-between items-center mx-10 mb-5'>
        <h1 className='text-3xl font-semibold'>
          Forex Rates
        </h1>

        {/* base rate */}
        <div>
          <label className='text-lg font-semibold'>Select Base Currency:</label>
          <select
            id='alias'
            name='alias'
            onChange={(e) => setAlias(e.target.value)}
            className='p-3 ml-6 border focus:outline-none border-sky-400 bg-slate-600 rounded-lg'
          >
            {conversionRates && Object.keys(conversionRates).map((currency, index) => (
              <option
                key={currency}
                value={currency}
                className='p-2'
              >
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* currency listing */}
      <div className='grid grid-cols-12 gap-x-10 mx-10'>
        <div className='col-span-8'>
          <table className='flex flex-col border p-6 border-sky-400 dark:border-indigo-400 rounded-lg text-center h-[38rem]'>
            <thead>
              <tr className='grid grid-cols-12 py-2 font-medium text-gray-900 text-sm bg-gray-300'>
                <th className='col-span-6'>
                  Foreign Currency
                </th>
                <th className='col-span-5'>
                  Exchange Rate
                </th>
              </tr>
            </thead>
            <tbody className='flex-1 overflow-y-auto'>
              {allCurrencies?.map(currency => (
                <tr
                  key={currency}
                  className='hover:bg-sky-400 group cursor-pointer grid grid-cols-12 py-2 border-b-2 border-sky-400'
                >
                  <td className='col-span-6'>{currency}</td>
                  <td className='col-span-5'>{conversionRates[currency]}</td>
                  <td className='col-span-1'>
                    <button onClick={(e) => handleAddCurrencyToWatchList(e, currency)}>
                      <PlusCircleIcon className='h-6 w-6 text-sky-400 group-hover:text-slate-600' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='col-span-4 flex flex-col space-y-10'>
          <div>
            <table className='border p-4 border-sky-400 dark:border-indigo-400 h-[18rem] rounded-lg flex flex-col text-center overflow-auto'>
              <thead>
                <tr className='grid grid-cols-12 py-2 font-medium text-gray-900 text-sm bg-gray-300'>
                  <th className='col-span-6'>
                    Watch List
                  </th>
                  <th className='col-span-5'>
                    Rate
                  </th>
                </tr>
              </thead>
              <tbody className='flex-1 overflow-y-scroll'>
                {watchList.length > 0 ? watchList.map(currency => (
                  <tr
                    key={currency}
                    className='hover:bg-sky-400 cursor-pointer grid grid-cols-12 py-2 border-b-2 border-sky-400 group'
                  >
                    <td className='col-span-6'>{currency}</td>
                    <td className='col-span-5'>{conversionRates[currency]}</td>
                    <td className='col-span-1'>
                      <button onClick={(e) => handleRemoveCurrencyFromWatchList(e, currency)}>
                        <MinusCircleIcon className='h-6 w-6 text-sky-400 group-hover:text-slate-600' />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td className='col-span-12 opacity-60 align-middle'>
                      No currencies added to watchlist...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div>
            <table className='border p-4 border-sky-400 dark:border-indigo-400 h-[18rem] rounded-lg flex flex-col text-center overflow-auto'>
              <thead>
                <tr className='grid grid-cols-12 py-2 font-medium text-gray-900 text-sm bg-gray-300'>
                  <th className='col-span-6'>
                    Currency
                  </th>
                  <th className='col-span-5'>
                    Rate
                  </th>
                </tr>
              </thead>
              <tbody className='flex-1 overflow-y-scroll'>
                {popularCurrencies?.map((currency, index) => (
                  <tr
                    key={index}
                    className='hover:bg-sky-400 cursor-pointer grid grid-cols-12 py-2 border-b-2 border-sky-400'
                  >
                    <td className='col-span-6'>{currency}</td>
                    <td className='col-span-6'>{conversionRates[currency]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Foreign

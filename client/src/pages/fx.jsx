import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

const FOREIGN_EXCHANGE_API_KEY = '70e28d22944f57e5ba6c3ad4'

const Foreign = () => {
  const [alias, setAlias] = useState('INR')
  const [conversionRates, setConversionRates] = useState({})
  const [watchList, setWatchList] = useState([])
  const [selectedCurrency, setSelectedCurrency] = useState('')

  const allCurrenciesArr = Object.keys(conversionRates)
  const popularCurrencies = Object.keys(conversionRates).filter(currency => ['USD', 'INR', 'EUR', 'AED'].includes(currency))

  useEffect(() => {
    const fetchCurrencies = async () => {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${FOREIGN_EXCHANGE_API_KEY}/latest/${alias}`)

      const { conversion_rates } = await response.json()

      setConversionRates(conversion_rates)
    }

    fetchCurrencies()
  }, [alias])

  const handleClick = (currency) => {
    setSelectedCurrency(currency)
    confirm('Add to watchlist')
    setWatchList(watchList => [...watchList, currency])
  }

  console.log(watchList)

  return (
    <div className='max-w-screen-xl mx-auto'>
      <div className='flex justify-between items-center mx-10 mb-5'>
        <h1 className='text-3xl font-semibold'>
          Forex Rates
        </h1>

        <div>
          <label className='text-lg font-semibold'>Select Base Currency:</label>
          <select
            id='alias'
            name='alias'
            onChange={(e) => setAlias(e.target.value)}
            className='p-3 ml-6 border focus:outline-none border-sky-400 rounded-lg'
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

      {/* details of all currencies */}
      <div className='grid grid-cols-12 gap-x-10 mx-10'>
        <div className='col-span-8'>
          <table className='flex flex-col border p-6 border-sky-400 dark:border-indigo-400 rounded-lg text-center h-[20rem]'>
            <thead className='text-center'>
              <tr className='font-medium text-gray-900 text-sm bg-gray-300'>
                <th>
                  Currency
                </th>
                <th>
                  Rate
                </th>
              </tr>
            </thead>
            <tbody className='flex-1 overflow-y-auto'>
              {allCurrenciesArr?.map(currency => (
                <tr
                  key={currency}
                  onClick={() => handleClick(currency)}
                  className='hover:bg-sky-400 cursor-pointer'
                >
                  <td className='px-4 py-3 w-full'>{currency}</td>
                  <td className='px-4 py-3 w-full'>{conversionRates[currency]}</td>
                  <td className='px-4 py-3'><PlusCircleIcon className='h-5 w-5' /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='col-span-4 flex flex-col space-y-10'>
          <div>
            <div>
              <table className='border p-4 border-sky-400 flex flex-col h-[15rem] text-center overflow-auto'>
                <thead className='content-center'>
                  <tr className='bg-gray-300'>
                    <th className='px-4 w-full py-3 title-font font-medium text-gray-900 text-sm '>Currency</th>
                    <th className='px-4 w-full py-3 title-font font-medium text-gray-900 text-sm '>Rate</th>
                  </tr>
                </thead>
                <tbody className='flex-1 overflow-y-scroll'>
                  {watchList && watchList?.map(currency => (
                    <tr
                      key={currency}
                      className='hover:bg-sky-400'
                    >
                      <td className='px-4 py-3 w-full'>{currency}</td>
                      <td className='px-4 py-3 w-full'>{conversionRates[currency]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div>
              <table className='border p-4 border-sky-400 dark:border-indigo-400 h-[15rem] rounded-lg flex flex-col text-center overflow-auto'>
                <thead className='content-center'>
                  <tr className='bg-gray-400'>
                    <th className='px-4 w-full py-3 title-font font-medium text-gray-900 text-sm'>Currency</th>
                    <th className='px-4 w-full py-3 title-font font-medium text-gray-900 text-sm'>Rate</th>
                  </tr>
                </thead>
                <tbody className='flex-1 overflow-y-scroll'>
                  {popularCurrencies?.map((currency, index) => (
                    <tr
                      key={index}
                      className='hover:bg-sky-400'
                    >
                      <td className='px-4 py-3 w-full'>{currency}</td>
                      <td className='px-4 py-3 w-full'>{conversionRates[currency]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Foreign

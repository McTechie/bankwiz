import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useMemo, useState } from 'react'

const Foreign = () => {
  const [alias, setAlias] = useState('INR')
  const [conversionRates, setConversionRates] = useState({})
  const [watchList, setWatchList] = useState([])
  const [selectedCurrency, setSelectedCurrency] = useState('')

  var today = new Date();
  var time = today.getHours() + ':' + today.getMinutes()

  const allCurrenciesArr = Object.keys(conversionRates)
  const popularCurrencies = useMemo(() => Object.keys(conversionRates).filter(currency => ['USD', 'INR', 'EUR', 'AED'].includes(currency)))

  useEffect(() => {
    const fetchCurrencies = async () => {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/70e28d22944f57e5ba6c3ad4/latest/${alias}`)

      const { conversion_rates } = await response.json()
      // popularCurrencies.push(alias)

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
    <div className=''>
      <div className='flex justify-between items-center mx-16 mb-5'>
        <h1 className='text-3xl font-semibold mb-6'>Foreign Exchange</h1>
        <select onChange={(e) => setAlias(e.target.value)} className='p-3 ml-6 border focus:outline-none border-sky-400 rounded-lg' name='' id='' >
          {conversionRates && Object.keys(conversionRates).map((currency, index) => (
            <option onClick={index} className='p-2' key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      {/* details of all currencies */}
      <div className='grid grid-cols-2 gap-x-10'>
        <div>
          <table class='flex flex-col border p-6 border-sky-400 text-center h-[40rem]'>
            <thead className='text-center'>
              <tr className=''>
                <th class='px-4 w-full py-3 title-font font-medium text-gray-900 text-sm bg-gray-300'>Currency</th>
                <th class='px-4 w-full py-3 title-font font-medium text-gray-900 text-sm bg-gray-300'>Rate</th>
              </tr>
            </thead>
            <tbody className='flex-1 overflow-y-scroll'>
              {allCurrenciesArr.map((currency, index) => (
                <tr key={index} onClick={() => handleClick(currency)} className='hover:bg-sky-400 cursor-pointer'>
                  <td class='px-4 py-3 w-full'>{currency}</td>
                  <td class='px-4 py-3 w-full'>{conversionRates[currency]}</td>
                  {/* <td class='px-10 py-3 '>{time}</td> */}
                  <td class='px-4 py-3'><PlusCircleIcon className='h-5 w-5' /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='flex flex-col space-y-10'>
          <div className=''>
            <h1 className='text-2xl font-semibold mb-6'>My Watch List</h1>
            <div>
              <table class='border p-4 border-sky-400 w-1/2 flex flex-col h-[15rem] text-center overflow-auto whitespace-no-wrap'>
                <thead className='content-center'>
                  <tr className='bg-gray-300'>
                    <th class='px-4 w-full py-3 title-font font-medium text-gray-900 text-sm '>Currency</th>
                    <th class='px-4 w-full py-3 title-font font-medium text-gray-900 text-sm '>Rate</th>
                  </tr>
                </thead>
                <tbody className='flex-1 overflow-y-scroll'>
                  {watchList.length > 0 ? watchList.map((currency, index) => (
                    <tr onClick={index} className='hover:bg-sky-400'>
                      <td class='px-4 py-3 w-full'>{currency}</td>
                      <td class='px-4 py-3 w-full'>{conversionRates[currency]}</td>
                    </tr>)) :
                    <div className='mx-auto mt-10 text-lg'>Add items to  your watchlist</div>
                  }
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h1 className='text-2xl font-semibold mb-6'>Popular Currencies</h1>
            <div>
              <table class='border p-4 border-sky-400 h-[15rem] flex flex-col w-1/2 text-center overflow-auto whitespace-no-wrap'>
                <thead className='content-center'>
                  <tr className='bg-gray-400'>
                    <th class='px-4 w-full py-3 title-font font-medium text-gray-900 text-sm'>Currency</th>
                    <th class='px-4 w-full py-3 title-font font-medium text-gray-900 text-sm'>Rate</th>
                  </tr>
                </thead>
                <tbody className='flex-1 overflow-y-scroll'>
                  {popularCurrencies.map((currency, index) => (
                    <tr key={index} className='hover:bg-sky-400'>
                      <td class='px-4 py-3 w-full'>{currency}</td>
                      <td class='px-4 py-3 w-full'>{conversionRates[currency]}</td>
                    </tr>))}
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

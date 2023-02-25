import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useMemo, useState } from 'react'

const Foreign = () => {
  const [alias, setAlias] = useState('INR')
  const [conversionRates, setConversionRates] = useState({})
  const [watchList, setWatchList] = useState([])
  const [selectedCurrency, setSelectedCurrency] = useState('')

  var today = new Date();
  var time = today.getHours() + ':' + today.getMinutes()

  const selectedCurrencies = useMemo(() => Object.keys(conversionRates).filter(currency => ['AED', 'USD'].includes(currency)))

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
    alert('Add to watchlist')
    setWatchList(watchList => [...watchList, currency])
  }
  console.log(watchList)

  return (
    <div className=''>
      <div className='flex justify-between items-center mx-16 mb-5'>
        <h1 className='text-3xl font-semibold mb-6'>Foreign Exchange</h1>
        <select onChange={(e) => setAlias(e.target.value)} className='p-3 ml-6 border focus:outline-none border-sky-400 rounded-lg' name='' id='' >
          {conversionRates && Object.keys(conversionRates).map((currency) => (
            <option className='p-2' key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>


      {/* details of all currencies */}
      <div className='grid grid-cols-2 gap-x-10'>
        <div>
          <table class='border-sky-400 text-center w-full'>
            <thead>
              <tr>
                <th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-sky-400 rounded-tl rounded-bl'>Currency</th>
                <th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-sky-400'>Rate</th>
                <th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-sky-400'></th>
              </tr>
            </thead>
            <tbody className='overflow-y-scroll'>
              {allCurrenciesArr.map(currency => (
                <tr onClick={() => handleClick(currency)} className='hover:bg-gray-300 cursor-pointer'>
                  <td class='px-4 py-3'>{currency}</td>
                  <td class='px-4 py-3'>{conversionRates[currency]}</td>
                  {/* <td class='px-10 py-3 '>{time}</td> */}
                  <td class='px-4 py-3'><PlusCircleIcon className='h-5 w-5' /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='flex flex-col space-y-20'>
          <div className=''>
            <h1 className='text-2xl font-semibold  mb-6'>My Watch List</h1>
            <div>
              <table class='border-sky-400 w-1/2 text-center overflow-auto whitespace-no-wrap'>
                <thead>
                  <tr>
                    <th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>Currency</th>
                    <th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Rate</th>
                  </tr>
                </thead>
                <tbody className='overflow-y-scroll'>
                  {watchList.map(currency => (
                    <tr className='' >
                      <td class='px-4 py-3'>{currency}</td>
                      <td class='px-4 py-3'>{conversionRates[currency]}</td>
                    </tr>))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h1 className='text-2xl font-semibold mb-6'>Popular Currencies</h1>
            <div>
              <table class='border-sky-400 w-1/2 text-center overflow-auto whitespace-no-wrap'>
                <thead>
                  <tr>
                    <th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>Currency</th>
                    <th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Rate</th>
                  </tr>
                </thead>
                <tbody className='overflow-x-hidden overflow-y-scroll'>
                  {popularCurrencies.map(currency => (
                    <tr className=''>
                      <td class='px-4 py-3'>{currency}</td>
                      <td class='px-4 py-3'>{conversionRates[currency]}</td>
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

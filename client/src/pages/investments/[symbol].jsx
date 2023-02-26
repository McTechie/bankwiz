import { useState,useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'





let tvScriptLoadingPromise

export default function TradingViewWidget() {
  const pathname = usePathname()
  const onLoadScriptRef = useRef()

  let [txt , setTxt] = useState("") 
  let [txtL , setTxtl] = useState(0) 
  let [txtH , setTxth] = useState(0) 
  let [rg , setRG] = useState("")   

  let [name , setName] = useState("") 
  let [market , setMarket] = useState("") 
  let [operating  , setOperation] = useState("")


  useEffect(() => {
    onLoadScriptRef.current = createWidget

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script')
        script.id = 'tradingview-widget-loading-script'
        script.src = 'https://s3.tradingview.com/tv.js'
        script.type = 'text/javascript'
        script.onload = resolve
        document.head.appendChild(script)
      })
    }

    tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current())
    return () => onLoadScriptRef.current = null

    function createWidget() {
      if (document.getElementById('tradingview_d3fc7') && 'TradingView' in window) {
        new window.TradingView.widget({
          autosize: true,
          symbol: `NASDAQ:${pathname?.split('/investments/')[1].toUpperCase()}`,
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview_d3fc7'
        })
      }
    }

  }, [])

  useEffect(()=>{
    getCurrencies()
  }, [])

  const getCurrencies = async () =>{
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4a0916ea78msh171b28b3644fb82p1dc88bjsn0c32f7ff434e',
            'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
        }
    };
    
    const res = await fetch(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${pathname?.split('/investments/')[1].toUpperCase()}/financial-data`, options)

    const { financialData } = await res.json()
    console.log(financialData)
    
    setTxt(financialData.currentPrice.fmt + " " + financialData.financialCurrency)
    
    setOperation(financialData.operatingCashflow.fmt)
    setRG(financialData.revenueGrowth.fmt )

  }

  useEffect(()=>{
    getStock()
  }, [])

  const getStock = async () =>{
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4a0916ea78msh171b28b3644fb82p1dc88bjsn0c32f7ff434e',
            'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
        }
    };
    
    const res = await fetch(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${pathname?.split('/investments/')[1].toUpperCase()}`, options)

    let data = await res.json()
    data = data[0]
    setName(data.longName)
    setTxth(data.regularMarketDayHigh)
    setTxtl(data.regularMarketDayLow)
    setMarket(data.marketCap)
  }
  let [jsxObject, setJ]= useState([]);
  useEffect(()=>{
    getNews()
  }, [])
  const getNews = async () =>{
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4a0916ea78msh171b28b3644fb82p1dc88bjsn0c32f7ff434e',
            'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
        }
    };
    
    const res = await fetch(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news/${pathname?.split('/investments/')[1].toUpperCase()}`, options)
    
    let data = await res.json()
    let {item}= data;

    let jsxObject = item.map((value, index) => {

      console.log(value.title)
      return (
          <div key={index} className="card border-2 space-y-2 m-2 rounded-lg bg-slate-900 text-white w-full py-10 px-2 ">
            <div className="text-xs">Publish Date: {value.pubDate}</div>
            <div className="title text-xl font-semibold">{value.title}</div>
            <div className="description">{value.description}</div>
          </div>
      )
    }) 

    setJ(jsxObject)
    // description -- link -- pubDate --title 
  }

  return (
    <div>
      <div className='tradingview-widget-container flex '>
        <div id='tradingview_d3fc7' className='h-96 w-2/3' />
        <div className='mx-5 w-1/3' >
          Name
          <div className='text-3xl'>89,212</div>
          <div className='flex justify-between  w-2/3'>
            <div className='text-red-500'>Low - 23333</div>
            <div className='text-green-600'>High - 5000</div>
          </div>
          <br />
          <hr />
          <div className="market-data mt-3">Market Cap</div>
          <div className=''>$4,000,000,000</div>
          <br />
          <div className="revenue-growth-data mt-3">Revenue Growth</div>
          <div className=''>8.9%</div>
          <br />
          <div className="revenue-growth mt-3">Operating Cashflow</div>
          <div className=''>$73.22B</div>
          <br />
        </div>
    <div className='tradingview-widget-container flex '>
      <div id='tradingview_d3fc7' className='h-96 w-2/3' />
      <div className='mx-5 w-1/3' >
        {name}
        <div className='text-3xl'>{txt}</div>
        <div className='flex justify-between  w-2/3'>
          <div className='text-red-500'>Low - {txtL}</div>
          <div className='text-green-600'>High - {txtH}</div>
        </div>
        <br />
        <hr/>
        <div className="market-data mt-3">Market Cap</div>
        <div className=''>${market}</div>
        <br />
        <div className="revenue-growth-data mt-3">Revenue Growth</div>
        <div className=''>{rg}</div>
        <br />
        <div className="revenue-growth mt-3">Operating Cashflow</div>
        <div className=''>${operating}</div>
        <br />
      </div>

      </div>

      <div className='news-segment mt-5 ml-3 border-solid'>
        <div className="text-2xl font-semibold text-center my-5">News Segment</div>
        <hr />
        <div className='overflow-y-scroll h-96'>
          {jsxObject}
          
          <hr />
        </div>
      </div>
    </div>
  )
}

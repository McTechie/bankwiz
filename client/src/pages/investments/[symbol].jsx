import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
let tvScriptLoadingPromise

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef()
  const pathname = usePathname()

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
        <hr/>
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

      </div>

      <div className='news-segment mt-5 ml-3 border-solid'>
        <div className="text-3xl">News Segment</div>
        <hr />
        <div className='something'>
          <div className="card border-2 w-full py-10">
            <div className="text-xs">Publish Date</div>
            <div className="title text-xl">Title</div>
            <div className="description">Description</div>
          </div>
          <div className="card border-2 w-full py-10">
            <div className="text-xs">Publish Date</div>
            <div className="title text-xl">Title</div>
            <div className="description">Description</div>
          </div>
          <div className="card border-2 w-full py-10">
            <div className="text-xs">Publish Date</div>
            <div className="title text-xl">Title</div>
            <div className="description">Description</div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  )
}
 
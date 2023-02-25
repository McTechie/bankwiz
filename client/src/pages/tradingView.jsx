import React, { useEffect, useRef } from 'react';




let tvScriptLoadingPromise;

export default function Sujal() {
  const onLoadScriptRef = useRef();

  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

      function createWidget() {
        if (document.getElementById('tradingview_28d77') && 'TradingView' in window) {
          new window.TradingView.widget({
            autosize: true,
            symbol: "NSE:KOTAKBANK",
            interval: "D",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: true,
            allow_symbol_change: false,
            container_id: "tradingview_28d77"
          });
        }
      }
    },
    []
  );

  return (
    <div className='tradingview-widget-container '>
      <div id='tradingview_28d77' className='h-96 w-96' />
      <div className="tradingview-widget-copyright">
        {/* <a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener" target="_blank"><span className="blue-text">AAPL stock chart</span></a> by TradingView */}
      </div>
    </div>
  );
}

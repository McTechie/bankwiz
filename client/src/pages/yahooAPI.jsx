import { useEffect, useState } from "react";

const Sujal1 = () => {

    const api_key = "PmZDipwK6qblg5ND91TZ54ktyRGMhpFO"

    let [value , setData] = useState([]) 
    let [txt , setTxt] = useState("") 
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
        
        const res = await fetch('https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/KOTAKBANK.NS/financial-data', options)

        const { financialData } = await res.json()
        console.log(financialData)
        
        setTxt(financialData.currentPrice.fmt)
      }
      


    return (    
        <div>    
            Hello from {txt}
        </div>
          );
}
 
export default Sujal1;


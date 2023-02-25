//Register
import Link from "next/link";
import { Lato } from 'next/font/google'
import { useDispatch, useSelector } from 'react-redux'

const lato = Lato({
    subsets: ['latin'],  
    weight: ['400', '700'],
    variable: '--font-lato'
  })
const Register = () => {
  const darkMode = useSelector(state => state.darkMode.isDarkMode)
    
    return ( 
        <div className={`${lato.variable} font-sans ${darkMode && 'dark'}`}>
        <div className="bg-slate-900 h-screen py-20">
            <form action="">
            <div className="bg-white rounded-lg border-b drop-shadow-lg  w-80 justify-center p-10 mx-auto">
           
           <h1 className="text-2xl mb-6 text-black font-bold text-center">Register</h1>
           <p className="text-black mb-2 font-bold text-center">Username</p>
           <input className="rounded mb-2 bg-gray-200 ml-8" type="text"/>
           <p className="text-black mb-2 font-bold text-center">Email</p>
           <input className="rounded mb-2 bg-gray-200 ml-8" type="email" />
           <p className="text-black mb-2 font-bold text-center">Password</p>
           <input className="rounded mb-2 bg-gray-200 ml-8" type="password" />
           <p className="text-black mb-2 font-bold text-center">Confirm Password</p>
           <input className="rounded mb-2 bg-gray-200 ml-8" type="password" />
           <p className="text-black mb-2 text-center"><Link href='/login'> Already registered, <span className="text-blue-400">Log In</span></Link></p>
           <button className="bg-indigo-400 hover:bg-indigo-600 p-2 rounded ml-24">Register</button>

       </div>
       </form>
        </div>
        </div>
     );
}
 
export default Register;



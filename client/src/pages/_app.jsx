// named imports
import { usePathname } from 'next/navigation'
import { Provider } from 'react-redux'
import { DashboardLayout } from '../layouts'

// default imports
import store from '../redux/store'

// style imports
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const pathname = usePathname()

  return (
    <Provider store={store}>
      {pathname === '/login' || pathname === '/register' ? (
        <Component {...pageProps} />
      ) : (
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      )}
    </Provider>
  )
}

export default MyApp

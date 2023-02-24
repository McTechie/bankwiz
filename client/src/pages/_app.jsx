// named imports
import { Provider } from 'react-redux'
import { DashboardLayout } from '../layouts'

// default imports
import store from '../redux/store'

// style imports
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    </Provider>
  )
}

export default MyApp

// named imports
import { usePathname } from 'next/navigation'
import {
  ArrowRightOnRectangleIcon,
  BanknotesIcon,
  CreditCardIcon,
  CurrencyEuroIcon,
  GlobeAmericasIcon,
  PresentationChartLineIcon,
  UserIcon
} from '@heroicons/react/20/solid'

// default imports
import Link from 'next/link'

const links = [
  {
    title: 'Dashboard',
    href: '/',
    icon: <PresentationChartLineIcon />
  },
  {
    title: 'Transactions',
    href: '/transactions',
    icon: <CreditCardIcon />
  },
  {
    title: 'Geo Locations',
    href: '/geolocation',
    icon: <GlobeAmericasIcon />
  },
  {
    title: 'Foreign Exchange',
    href: '/fx',
    icon: <CurrencyEuroIcon />
  },
  {
    title: 'Investments',
    href: '/investments',
    icon: <BanknotesIcon />
  },
  {
    title: 'My Profile',
    href: '/profile',
    icon: <UserIcon />
  }
]

const SideBar = () => {
  const pathname = usePathname()

  const fullname = 'Olivia Wilson'
  const role = 'Financial Controller'

  return (
    <aside className='min-h-screen flex flex-col p-4 space-y-20'>
      <div className='flex items-center space-x-4'>
        <div className='h-8 w-8 bg-gray-400 dark:bg-indigo-400 rounded-full' />
        <div>
          <h2 className='text-sm font-semibold border-b pb-[0.15rem]'>
            {fullname}
          </h2>
          <p className='text-xs mt-1'>
            {role}
          </p>
        </div>
      </div>

      <div className='flex flex-col flex-1 space-y-4 mr-4 text-sm'>
        {links.map(link => (
          <Link key={link.href} href={link.href}>
            <div className={`nav-link ${
              // To find the currently active sidebar link,
              // check if the current route (irrespective of any sub-routes) is the same as the link href
              (pathname?.split('/')[1] === link.href.split('/')[1]) && 'nav-link-active'
              }`}>
              <div className='w-5 h-5'>
                {link.icon}
              </div>
              <p className='ml-2'>
                {link.title}
              </p>
            </div>
          </Link>
        ))}

      </div>

      <button className='nav-link'>
        <ArrowRightOnRectangleIcon className='w-5 h-5' />
        <p className='ml-2'>
          Logout
        </p>
      </button>
    </aside>
  )
}

export default SideBar

// named imports
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'
import { ArrowDownCircleIcon, ArrowUpCircleIcon, ChevronLeftIcon, ChevronRightIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'

// default imports
import toast from 'react-hot-toast'
import CsvDownloadButton from 'react-json-to-csv'
import React from 'react'

const SeverityBadge = ({ severity }) => {
  const getSeverityAndColor = (severity: number) => {
    switch (severity) {
      case 1:
        return { type: 'TRACE', color: 'bg-gray-300' }
      case 2:
        return { type: 'DEBUG', color: 'bg-gray-400 text-white' }
      case 3:
        return { type: 'INFO', color: 'bg-sky-300' }
      case 4:
        return { type: 'WARN', color: 'bg-amber-300' }
      case 5:
        return { type: 'ERROR', color: 'bg-red-300' }
      case 6:
        return { type: 'FATAL', color: 'bg-rose-400 text-white' }
      default:
        return { type: 'TRACE', color: 'bg-gray-300' }
    }
  }

  const { type, color } = getSeverityAndColor(severity)

  return (
    <span className={`text-xs px-2 py-1 rounded-full text-gray-700 ${color}`}>
      {type}
    </span>
  )
}

const Listing = ({ transactions }) => {
  const router = useRouter() // next router

  const { register, handleSubmit } = useForm() // react-hook-form

  // get all the severities from the transactions and avoid duplicates
  // const severities = useMemo(() => Array.from(new Set(transactions.map((transaction) => transaction.severity))), [transactions])
  
  // get all the sources from the transactions and avoid duplicates
  // const sources = useMemo(() => Array.from(new Set(transactions.map((transaction) => transaction.source))), [transactions])

  // sorting logic states
  const [isSortedBySeverity, setIsSortedBySeverity] = useState(false)
  const [isSortedBySource, setIsSortedBySource] = useState(false)

  // pagination logic states
  const [currentPage, setCurrentPage] = useState(1)
  const [logsPerPage, setLogsPerPage] = useState(8)

  // filtering logic state
  const [filteredData, setFilteredData] = useState(transactions)

  // sorting handler functions
  const handleSortBySeverity = () => {
    // Sorting Logic
    // -------------
    // Case #1:
    //   If the transactions have already been sorted by severity, then sort them in descending order
    // Case #2:
    //   If the transactions have not been sorted by severity, then sort them in ascending order

    let newlySortedLogs = []

    if (isSortedBySeverity) {
      newlySortedLogs = filteredData?.sort((a, b) => a.severity - b.severity)
    } else {
      newlySortedLogs = filteredData?.sort((a, b) => b.severity - a.severity)
    }

    setFilteredData(newlySortedLogs)
    setIsSortedBySeverity(isSortedBySeverity => !isSortedBySeverity)
  }

  const handleSortBySource = () => {
    // Sorting Logic
    // -------------
    // Case #1:
    //   If the transactions have already been sorted by source, then sort them in descending order
    // Case #2:
    //   If the transactions have not been sorted by source, then sort them in ascending order

    let newlySortedLogs = []

    if (isSortedBySource) {
      newlySortedLogs = filteredData?.sort((a, b) => a.source.localeCompare(b.source))
    } else {
      newlySortedLogs = filteredData?.sort((a, b) => b.source.localeCompare(a.source))
    }

    setFilteredData(newlySortedLogs)
    setIsSortedBySource(isSortedBySource => !isSortedBySource)
  }

  // pagination handler functions
  const handlePagination = (e, type) => {
    e.preventDefault() // prevent default behavior

    if (type === 'previous') {
      if (currentPage > 1) {
        setCurrentPage(currentPage => currentPage - 1)
      }
    } else {
      if (currentPage < Math.ceil(filteredData?.length / logsPerPage)) {
        setCurrentPage(currentPage => currentPage + 1)
      }
    }
  }

  // filter handler function
  const handleFilterLogs = async (data) => {
    // if all the fields are empty, then return
    if (data.fromDate === '' && data.toDate === '' && data.source === '' && data.severity === 0) {
      setFilteredData(transactions)

      // reset pagination
      setCurrentPage(1)

      // reset sorting
      setIsSortedBySeverity(false)
      setIsSortedBySource(false)

      return
    }

    const notification = toast.loading('Filtering transactions...', {
      style: {
        background: '#334155',
        color: '#d1d5db',
      },
    })

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date_from: data.fromDate,
        date_to: data.toDate,
        source: data.source,
        severity: data.severity,
      }),
    })
    
    if (res.status === 200) {
      const resData = await res.json()

      setFilteredData(resData)

      toast.dismiss(notification)
      toast.success('Transactions filtered successfully!', {
        style: {
          background: '#334155',
          color: '#d1d5db',
        },
      })

      // reset pagination
      setCurrentPage(1)

      // reset sorting
      setIsSortedBySeverity(false)
      setIsSortedBySource(false)
    } else {
      toast.dismiss(notification)
      toast.error('An error occurred while filtering transactions!', {
        style: {
          background: '#334155',
          color: '#d1d5db',
        },
      })
    }
  }

  // delete all transactions handler function
  const handleDeleteAllLogs = async () => {
    const notification = toast.loading('Deleting transactions...', {
      style: {
        background: '#334155',
        color: '#d1d5db',
      },
    })

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions/`, {
      method: 'DELETE',
    })

    if (res.status === 200) {
      toast.dismiss(notification)
      toast.success('Transactions deleted successfully!', {
        style: {
          background: '#334155',
          color: '#d1d5db',
        },
      })

      router.refresh()
    } else {
      toast.dismiss(notification)
      toast.error('Something went wrong!', {
        style: {
          background: '#334155',
          color: '#d1d5db',
        },
      })
    }
  }

  useEffect(() => {
    const infoToast = toast((t) => (
      <div>
        <div className='border-b-2 pb-1 mb-2 flex justify-between'>
          <p className='font-semibold flex items-center space-x-1'>
            <InformationCircleIcon className='inline-block w-5 h-5' />
            <span>Transactions Listings</span>
          </p>
          <button onClick={() => toast.dismiss(t.id)}>
            <XMarkIcon className='inline-block w-5 h-5' />
          </button>
        </div>
        
        <ol className='text-xs pt-2 pl-1 list-decimal'>
          <li><b>Filter transactions</b> by severity, source, and date range!</li>
          <li><b>Sort transactions</b> by severity and source!</li>
          <li>View transactions in a <b>paginated format</b>!</li>
          <li>Click on a transaction to view its <b>details</b>!</li>
        </ol>
      </div>
    ), {
      duration: 8000,
      style: {
        background: '#4b5563',
        color: '#d1d5db',
      },
    })

    return () => {
      // removing toast message on unmount
      toast.dismiss(infoToast)
    }
  }, [])

  return (
    <div className='w-full'>
      <Toaster
        position='bottom-right'
        reverseOrder={false}
      />
      {/* Transaction Count and Download Section */}
      <section className='my-6 relative'>
        <p className='text-center text-xs text-gray-500 dark:text-gray-300'>
          Result: {filteredData?.length} transactions
        </p>
        
        <div className='absolute right-6 -top-2 flex space-x-2'>
          <div className='w-fit cta-btn'>
            <CsvDownloadButton data={transactions} />
          </div>
        </div>
      </section>

      {/* Table */}
      {filteredData?.length > 0 && (
        <section>
          <table className='w-full table-fixed text-center'>
            <thead>
              <tr className='table-header-row'>
                <th>Timestamp</th>
                <th>
                  <div className='flex items-center justify-center relative'>
                    <p>Severity</p>
                    <button
                      type='button'
                      onClick={handleSortBySeverity}
                      className='absolute right-5'
                    >
                      {isSortedBySeverity ? (
                        <ArrowUpCircleIcon className='w-5 h-5' />
                      ) : (
                        <ArrowDownCircleIcon className='w-5 h-5' />
                      )}
                    </button>
                  </div>
                </th>
                <th>
                  <div className='flex items-center justify-center relative'>
                    <p>Source</p>
                    <button
                      type='button'
                      onClick={handleSortBySource}
                      className='absolute right-5'
                    >
                      {isSortedBySource ? (
                        <ArrowUpCircleIcon className='w-5 h-5' />
                      ) : (
                        <ArrowDownCircleIcon className='w-5 h-5' />
                      )}
                    </button>
                  </div>
                </th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage).map(transaction => (
                <tr
                  key={transaction.id}
                  className='table-body-row'
                  onClick={() => router.push(`/listing/${transaction.id}`)}
                >
                  <td>
                    {/* {new Date(transaction.} */}
                  </td>
                  <td>
                    <SeverityBadge severity={transaction.severity} />
                  </td>
                  <td>
                    {/* {transaction.source} */}
                  </td>
                  <td>
                    {/* {transaction.message.length > 30 ? `${transaction.message.substring(0, 30)}...` : transaction.message} */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Pagination */}
      {filteredData?.length > 0 && (
        <section className='mt-7'>
          <p className='text-center text-xs text-gray-500 dark:text-gray-300 mb-12'>
            Showing page {currentPage} of {Math.ceil(filteredData?.length / logsPerPage)}
          </p>

          <div className='flex items-center space-x-10 justify-center'>
            <button
              type='button'
              onClick={(e) => handlePagination(e, 'previous')}
              className='flex space-x-2 items-center p-2 pr-4 rounded-lg text-sm bg-emerald-400 dark:bg-indigo-400'
            >
              <ChevronLeftIcon className='w-4 h-4' />
              <span>Previous</span>
            </button>
            
            <div className='flex items-center'>
              <label
                htmlFor='paginationSize'
                className='text-sm text-gray-500 dark:text-gray-300'
              >
                Transactions per page:
              </label>
              <select
                name='paginationSize'
                id='paginationSize'
                className='text-sm text-gray-500 dark:text-gray-300 ml-2 bg-emerald-400 dark:bg-indigo-400 rounded-md p-1'
                value={logsPerPage}
                onChange={(e) => setLogsPerPage(parseInt(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={8}>8</option>
                <option value={10}>10</option>
              </select>
            </div>

            <button
              type='button'
              onClick={(e) => handlePagination(e, 'next')}
              className='flex space-x-2 items-center p-2 pl-4 rounded-lg text-sm bg-emerald-400 dark:bg-indigo-400'
            >
              <span>Next</span>
              <ChevronRightIcon className='w-4 h-4' />
            </button>
          </div>
        </section>
      )}
    </div>
  )
}

export default Listing

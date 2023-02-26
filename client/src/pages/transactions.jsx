import { bankStatements } from "../../data"
const Transactions = () => {
  console.log(bankStatements)
  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>Account Statements</h1>
      <div className='mx-20'>
        {
          bankStatements &&
          <section className=''>
            <table className='flex flex-col border p-6 border-sky-400 text-center h-[40rem]'>
              <thead className='rounded-lg text-lg text-center'>
                <tr>
                <th className='px-12 py-4 title-font font-medium text-gray-900 text-lg bg-gray-400'>Date</th>
                <th className='px-12 py-4 title-font font-medium text-gray-900 text-lg bg-gray-400'>Amount</th>
                <th className='px-12 py-4 title-font font-medium text-gray-900 text-lg bg-gray-400'>Purpose</th>
                <th className='px-12 py-4 title-font font-medium text-gray-900 text-lg bg-gray-400'>Via</th>
                <th className='px-12 py-4 title-font font-medium text-gray-900 text-lg bg-gray-400'>Status</th>
                <th className='px-12 py-4 title-font font-medium text-gray-900 text-lg bg-gray-400'>Payee</th>
                </tr>
              </thead>
              <tbody className='flex-1 overflow-y-scroll'>
                {bankStatements.map((statement, index) => (
                  <tr className='hover:bg-sky-400' key={statement.transaction_id}>
                    <td className='px-8 text-lg'>
                      <p className='font-semibold'>{statement.transaction_date}</p>
                      <p className='text-sm text-center'>{statement.transaction_time_stamp}</p>
                    </td>
                    <td className='px-6'>{statement.transaction_amount}</td>
                    <td className='px-6'>{statement.transaction_purpose}</td>
                    <td className='px-6'>{statement.transaction_type}</td>
                    <td className='px-6'>{statement.transaction_status}</td>
                    <td className='px-6'>{statement.transaction_with}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        }
      </div>
    </div>
  )
}

export default Transactions

import { bankStatements } from "../../data"
const Transactions = () => {
  console.log(bankStatements)
  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>Account Statements</h1>
      <div className='mx-20'>
        {
          bankStatements.length > 0 &&
          <section className=''>
            <table className='flex flex-col w-full h-[40rem]'>
              <thead className='text-xl rounded-lg text-center bg-sky-300'>
                <th className='px-8 py-6'>Date</th>
                <th className='px-8 py-6'>Amount</th>
                <th className='px-8 py-6'>Purpose</th>
                <th className='px-8 py-6'>Via</th>
                <th className='px-8 py-6'>Status</th>
                <th className='px-8 py-6'>Payee</th>
              </thead>
              <tbody className='overflow-y-auto'>
                {bankStatements.map(statement => (
                  <tr className='text-center hover:cursor-pointer rounded-lg hover:bg-gray-400' key={statement.transaction_id}>
                    <td className='px-8 py-3 text-lg'>
                      <p className='font-semibold'>{statement.transaction_date}</p>
                      <p className='text-sm text-center'>{statement.transaction_time_stamp}</p>
                    </td>
                    <td className='px-8 text-lg '>{statement.transaction_amount}</td>
                    <td className='px-8 text-lg '>{statement.transaction_purpose}</td>
                    <td className='px-8 text-lg '>{statement.transaction_type}</td>
                    <td className='px-8 text-lg '>{statement.transaction_status}</td>
                    <td className='px-8 text-lg '>{statement.transaction_with}</td>
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

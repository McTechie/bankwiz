import Image from "next/image"
import CsvDownloadButton from 'react-json-to-csv'

const Profile = ({ transactions }) => {
  const data = {
    id: '123',
    company_id: 'ABC',
    password: '123456',
    first_name: 'Johnny',
    last_name: 'Rhodes',
    designation: 'Treasurer',
    email: 'johnnyrhodes@persistent.com',
    aadhar: '98765432',
    pan: 'ADSF16567',
    created: '10/12/2020'
  }

  return (
    <div className='mx-10 mt-10'>
      <div className='flex'>

        <Image className='rounded-full' height={300} width={300} src='https://earthlette.com.au/wp-content/uploads/2016/10/Jem-final-profile-pic-circle2-1-1024x1018.png' />

        <div className='grid grid-cols-2 gap-x-16'>
          <div className=''>
            <label className='mx-10 text-xl font-semibold' htmlFor="first_name">Full Name</label>
            <input value={data.first_name + ' ' + data.last_name} disabled className='px-4 py-3 rounded-lg border border-sky-400' />
          </div>
          <div className=''>
            <label className='mx-10 text-xl font-semibold' htmlFor="id">ID</label>
            <input value={data.id} disabled className='px-4 py-3 rounded-lg border border-sky-400' />
          </div>
          <div className=''>
            <label className='mx-10 text-xl font-semibold' htmlFor="designation">Company Id</label>
            <input value={data.company_id} disabled className='px-4 py-3 rounded-lg border border-sky-400' />
          </div>
          <div className=''>
            <label className='mx-10 text-xl font-semibold' htmlFor="email">Email</label>
            <input value={data.email} disabled className='px-4 py-3 rounded-lg border border-sky-400' />
          </div>
          <div className=''>
            <label className='mx-10 text-xl font-semibold' htmlFor="designation">Designation</label>
            <input value={data.designation} disabled className='px-4 py-3 rounded-lg border border-sky-400' />
          </div>
          <div className=''>
            <label className='mx-10 text-xl font-semibold' htmlFor="designation">Aadhar</label>
            <input value={data.aadhar} disabled className='px-4 py-3 rounded-lg border border-sky-400' />
          </div>
          <div className=''>
            <label className='mx-10 text-xl font-semibold' htmlFor="designation">Pan number</label>
            <input value={data.pan} disabled className='px-4 py-3 rounded-lg border border-sky-400' />
          </div>
          <div className=''>
            <label className='mx-10 text-xl font-semibold' htmlFor="designation">Created At</label>
            <input value={data.created} disabled className='px-4 py-3 rounded-lg border border-sky-400' />
          </div>
        </div>
      </div>

      <section className='my-6 relative'>        
        <div className='flex justify-center items-center'>
          <div className='w-fit cta-btn'>
            <CsvDownloadButton data={transactions} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Profile


export const getServerSideProps = async () => {
  // mock data
  // const data = [
  //   {
  //     id: '1',
  //     timestamp: 1672531200000,
  //     severity: 1,
  //     source: 'Server',
  //     message: 'This is a log message',
  //   },
  //   {
  //     id: '2',
  //     timestamp: 1672531200000,
  //     severity: 2,
  //     source: 'Server',
  //     message: 'This is a log message',
  //   },
  //   {
  //     id: '3',
  //     timestamp: 1672531200000,
  //     severity: 5,
  //     source: 'Client',
  //     message: 'This is a log message lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
  //   },
  //   {
  //     id: '4',
  //     timestamp: 1672531200000,
  //     severity: 4,
  //     source: 'Server',
  //     message: 'This is a log message lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
  //   },
  //   {
  //     id: '5',
  //     timestamp: 1672531200000,
  //     severity: 3,
  //     source: 'Service X',
  //     message: 'This is a log message lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
  //   },
  //   {
  //     id: '6',
  //     timestamp: 1672531200000,
  //     severity: 6,
  //     source: 'Server',
  //     message: 'This is a log message lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
  //   },
  //   {
  //     id: '7',
  //     timestamp: 1672531200000,
  //     severity: 6,
  //     source: 'DB Instace Y',
  //     message: 'This is a log message lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
  //   },
  //   {
  //     id: '8',
  //     timestamp: 1672531200000,
  //     severity: 4,
  //     source: 'Server',
  //     message: 'This is a log message lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
  //   },
  //   {
  //     id: '9',
  //     timestamp: 1672531200000,
  //     severity: 3,
  //     source: 'Service X',
  //     message: 'This is a log message lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
  //   },
  //   {
  //     id: '10',
  //     timestamp: 1672531200000,
  //     severity: 6,
  //     source: 'Server',
  //     message: 'This is a log message lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
  //   },
  //   {
  //     id: '11',
  //     timestamp: 1672531200000,
  //     severity: 6,
  //     source: 'DB Instace Y',
  //     message: 'This is a log message lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
  //   },
  //   {
  //     id: '12',
  //     timestamp: 1672531200000,
  //     severity: 4,
  //     source: 'Server',
  //     message: 'This is a log message lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
  //   },
  // ]
  
  const res = await fetch(`http://localhost:8000/api/aggregate/relevant_fields/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id: 21 }),
  })

  const data = await res.json()

  return {
    props: {
      data,
    },
  }
}

import Image from "next/image"
const Profile = () => {
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
    </div>
  )
}

export default Profile

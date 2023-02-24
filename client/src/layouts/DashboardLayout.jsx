const DashboardLayout = ({ children }) => {
  return (
    <div className='grid grid-cols-12'>
      <aside className='col-span-2'>
        Sidebar
      </aside>
      <div className='col-span-10'>
        <div>Appbar</div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout

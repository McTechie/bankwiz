const Home = () => {
  return (
    <div>
      <script type='module' src='https://10az.online.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js'></script>
      
      <main className='max-w-screen-xl mx-auto'>
      <tableau-viz id='tableau-viz' src='https://10az.online.tableau.com/t/demopersistent/views/Book1/Dashboard1/728cfbbf-2bca-4ec8-9c94-3f08d3ae309c/7c012d7e-9d48-4d82-9759-670f2d432d1a' width='786' height='500' hide-tabs toolbar='bottom' ></tableau-viz>
      </main>
    </div>
  )
}

export default Home

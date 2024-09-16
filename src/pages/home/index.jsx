import { useContext } from "react"
import Layout from "../../components/layout"
import Card from "../../components/card"
import ProductDetail from "../../components/productdetail"
import { ShoppingCartContext } from "../../context"

function Home() {
  const context = useContext(ShoppingCartContext)

  const renderView = () => {
    if (context.searchByTittle?.length > 0) {
      if (context.filteredItems.length > 0) {
        return (
          context.filteredItems?.map(item => (
            <Card key={item.id} data={item} />
        ))
        )
      } else {
        return (
          <div>
            We don´t have anything :(
          </div>
        )
      }
    } else {
      return (
          context.items?.map(item => (
            <Card key={item.id} data={item} />
        ))
      )
    }
  }

    return (
      <Layout>
        <div className='flex items-center justify-center relative w-80 mb-4'>
          <h1 className='font-medium text-xl'>Exclusive Products</h1>
        </div>
        <input 
          type="text" 
          placeholder='Search a product' 
          className=' border border-black rounded-lg w-80 p-4 mb-4 focus:outline-none'
          onChange={(event) => context.setSearchByTittle(event.target.value)}/>
        <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
          {renderView()}
        </div>
        <ProductDetail />
      </Layout>
    )
  }
  
  export default Home
import Layout from "../../components/layout"
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import OrderCard from "../../components/ordercard"
import { ShoppingCartContext } from '../../context'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'

function MyOrder() {
  const context = useContext(ShoppingCartContext)
  const currentPath = window.location.pathname
  const parts = currentPath.split('/')
  let index = parts[2]
  if (index === 'last') index = context.order?.length - 1

    return (
      <Layout>
        <div className='flex items-center justify-center relative w-80 mb-6'>
          <Link to='/my-orders' className='absolute left-0'>
            <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer'/>
          </Link>
          <h1>My Order</h1>
        </div>
        <div className='flex flex-col w-80'>
          {
            context.order?.[index]?.products.map(product => (
              <OrderCard 
                key={product.id}
                title={product.title} 
                imageUrl={product.images}
                price={product.price}
              />
            ))
          }
          </div>
      </Layout>
    )
  }
  
  export default MyOrder
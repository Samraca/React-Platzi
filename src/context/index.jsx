import { createContext, useState, useEffect } from 'react'

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({children}) => {
    const [count, setCount] = useState(0)

    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)
    
    const [productToShow, setProductToShow] = useState({})

    const [cartProducts, setCartProducts] = useState([])

    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    const [order, setOrder] = useState([])

    const [items, setItems] = useState(null)
    const [filteredItems, setFilteredItems] = useState(null)

    const [searchByTittle, setSearchByTittle] = useState(null)
    const [searchByCategory, setSearchByCategory] = useState(null)
    
    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products')
        .then(response => response.json())
        .then(data => setItems(data))
    }, [])

    const filteredItemsByTittle = (items, searchByTittle) => {
    return items?.filter(item => item.title.toLowerCase().includes(searchByTittle.toLowerCase()))
    }

    const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
    }

    const filterBy = (searchType, items, searchByTittle, searchByCategory) => {
        if (searchType === 'BY_TITLE') {
            return filteredItemsByTittle(items, searchByTittle)
        }
        
        if (searchType === 'BY_CATEGORY'){
            return filteredItemsByCategory(items, searchByCategory)
        }

        if (searchType === 'BY_TITLE_AND_CATEGORY') {
            return filteredItemsByTittle(items, searchByTittle).filter(item => item.title.toLowerCase().includes(searchByTittle.toLowerCase()) )
        }

        if (!searchType){
            return items
        }
    }

    useEffect(() => { 
        if (searchByTittle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE',items, searchByTittle, searchByCategory))
        if (searchByCategory && !searchByTittle) setFilteredItems(filterBy('BY_CATEGORY' ,items, searchByCategory, searchByTittle))
        if (!searchByCategory && !searchByTittle) setFilteredItems(filterBy(null ,items, searchByCategory, searchByTittle))
            if (searchByCategory && searchByTittle) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY' ,items, searchByCategory, searchByTittle))
    }, [items, searchByTittle, searchByCategory])



    return (
        <ShoppingCartContext.Provider value={{
            count, setCount, openProductDetail, closeProductDetail, 
            isProductDetailOpen, productToShow, setProductToShow,
            cartProducts, setCartProducts, isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen,
            openCheckoutSideMenu, closeCheckoutSideMenu, order, setOrder, items, setItems, 
            searchByTittle, setSearchByTittle, filteredItems, setFilteredItems, searchByCategory,
            setSearchByCategory
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

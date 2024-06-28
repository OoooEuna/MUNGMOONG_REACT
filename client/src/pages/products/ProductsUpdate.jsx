import React from 'react'
import ProductsUpdateContainer from '../../containers/products/ProductsUpdateContainer'
import { useParams } from 'react-router-dom'

const productsUpdate = () => {
  const { no } = useParams()
  return (
    <>
      {/* Header */}
      <ProductsUpdateContainer no={no} />
      {/* Footer */}
    </>
  )
}

export default productsUpdate
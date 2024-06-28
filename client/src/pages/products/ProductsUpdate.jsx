import React from 'react'
import ProductsUpdateContainer from '../../containers/products/ProductsUpdateContainer'
import { useParams } from 'react-router-dom'

const productsUpdate = () => {
  const { id } = useParams()
  return (
    <>
      {/* Header */}
      <ProductsUpdateContainer id={id} />
      {/* Footer */}
    </>
  )
}

export default productsUpdate
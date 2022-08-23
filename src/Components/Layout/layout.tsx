import React from 'react'
// Components
import Header from './header'
import Footer from './footer'

type Props = {
  children: React.ReactNode
}

function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <div className='container'>
        {children}
      </div>
      <Footer />
    </>

  )
}

export default React.memo(Layout)
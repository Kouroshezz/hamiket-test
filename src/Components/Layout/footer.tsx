import React from 'react'

function Footer() {
  
  const d = new Date();
  let getYear = d.getFullYear();

  return (
    <footer className='flex justify-center py-4 bg-primary text-secondary-300'>
     All rights reserved &copy; {getYear}
    </footer>
  )
}

export default React.memo(Footer)
import React, { RefObject, useEffect, useRef } from 'react';

import { NavLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { login, logout } from '../../store/Slices/userSlice';

type Link = {
  title: string,
  link: string
}


function Header() {

  const dispatch = useAppDispatch();
  const userstatus = useAppSelector((state) => state.user.login);

  const links = [
    { title: 'Home', link: '/' },
    // {title : 'about-us' , link : '/about'}
    // ....
  ]

  return (
    <header className='flex max-w-[95vw] md:max-w-[auto] items-center flex-wrap justify-between px-4 md:px-7 py-5 border-b border-gray-100 mb-5'>
      <div className='flex items-center'>
        <NavLink to='/'>
          <img src="/logo512.png" className='max-w-[80px]' alt="Site Logo" />
        </NavLink>
        <nav>
          <ul>
            {links.map((item: Link, index: number) =>
              <li className='p-2' key={index}>
                <NavLink to={`${item.link}`} className={({ isActive }) =>
                  isActive ? 'text-primary' : undefined}>
                  {item.title}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <>{userstatus === 'true' ?
        <>
          <div className='inline-flex items-center'>
            <span>👤</span>
            <span className='cursor-pointer [margin-inline-start:10px]' onClick={() => dispatch(logout())}>logout</span>
          </div>
        </>
        : <NavLink to='/login' className={({ isActive }) =>
          isActive ? 'text-primary' : undefined}>
          Login
        </NavLink>
      }

      </>
    </header>
  )
}

export default React.memo(Header)
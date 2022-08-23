import Cookies from 'js-cookie';
import React, { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { login } from '../../store/Slices/userSlice';
// Components
import AuthLayout from '../Layout/authLayout';

function Login() {

  let navigate = useNavigate();
  const passRef = useRef<HTMLInputElement | any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [editNumber, setEditNumber] = useState<string>('');
  const [fakeloading, setFakeloading] = useState<boolean>(false);
  const [validInput, setValidInput] = useState<boolean | null>(null);

  const dispatch = useAppDispatch();
  const userstatus = useAppSelector((state) => state.user.login);


  useEffect(() => {
    dispatch(login(Cookies.get('login')));
    userstatus === 'true' && navigate('/');
  }, [userstatus])

  function checkValidInput() {
    inputRef?.current?.value.length === 11 &&
      inputRef?.current?.value.toString().substring(0, 2) === '09' &&
      passRef?.current?.value?.length >= 8
      ? setValidInput(true) : setValidInput(false);
  }

  function checkNumber(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Backspace" && e.key !== "Delete" && e.key !== 'Enter' && isNaN(Number(e.key)) || e.key === 'e') {
      e.preventDefault()
    }
  }

  function loginUSer() {
    if(validInput){
      setFakeloading(true);
      dispatch(login(true));
      setTimeout(() => { navigate('/') }, 1500)
    }
  }

  return (
    <AuthLayout>
      <h2 className='text-2xl mb-3'>Welcome Back</h2>
      <p className='text-disabled'>please enter your number like : 09121234567</p>
      <form className="mt-10" onClick={loginUSer}>
        <div dir='ltr' className='input-control flex items-center rounded-md border border-secondary-100 focus-within:border-secondary-300' >
          <span className='text-xl pl-3 pr-1'>&#128241;</span>
          <input type="text" maxLength={11}
            placeholder="09121234567"
            className='py-3 px-5 w-full block focus:outline-hidden border-0'
            ref={inputRef} onKeyDown={(e) => checkNumber(e)} onKeyUp={checkValidInput}
          />
        </div>
        <div className='input-control flex items-center mt-4
        rounded-md border border-secondary-100 focus-within:border-secondary-300' >
          <span className='text-xl pl-3 pr-1'>&#128273;</span>
          <input type="password" minLength={8} maxLength={32}
            ref={passRef} onKeyUp={checkValidInput}
            className='py-3 px-5 w-full block focus:outline-hidden border-0' />
        </div>
        <button className={`btn btn-primary w-full mt-8 ${!validInput && 'btn-disabled'}`} disabled={validInput ? false : true}>
          {fakeloading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default React.memo(Login)
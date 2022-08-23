import React, { useState } from 'react'
import { useEffect } from 'react';
// library
import VerificationInput from 'react-verification-input';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
// Redux
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
// Component
import AuthLayout from '../Layout/authLayout'
import { login } from '../../store/Slices/userSlice';

function OTP() {

  let params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const phoneNumber = searchParams.get('q');
  const [wrongotp, setWrongotp] = useState<boolean>(false);
  const [fakeloading, setFakeloading] = useState<boolean>(false);
  // redux
  const dispatch = useAppDispatch();
  const userstatus = useAppSelector((state) => state.user.login);


  useEffect(() => {
    phoneNumber === null && navigate('/')
  }, [])

  const [btnDisable, setBtnDisable] = useState<boolean>(true);

  const optInputChang = (e: any) => {
    e.length == 4 && e === '1111' ? setBtnDisable(false) : setBtnDisable(true);

    setTimeout(() => {
      let allinput = document.querySelectorAll('.vi__character');
      allinput.forEach((items: any) => {
        if (items.innerText !== '-') {
          items.classList.add('active-input-opt')
        }
        else
          items.classList.remove('active-input-opt')
      })
    }, 0);


    if (e.length == 4) {
      if (e === '1111') {
        setFakeloading(true);
        dispatch(login(true));
        setTimeout(() => { navigate('/') }, 1500)
      }
      else if (e !== '1111') {
        setFakeloading(true);
        setTimeout(() => {
          setWrongotp(true);
          setFakeloading(false);
        }, 1000)
      }
    }
    else { setWrongotp(false); setFakeloading(false); }
  }

  function verifyOtp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const otpPass: HTMLInputElement | null = document.querySelector('input.vi');
    otpPass?.value.length === 4 && otpPass?.value === '1111' &&
      navigate('/')
  }

  return (
    <AuthLayout>
      <form className="" onSubmit={verifyOtp}>
        <p className='text-lg mb-10'>رمز یکبارمصرف به شماره
          <strong className='text-gray-900 px-2 '>{phoneNumber}</strong>
          ارسال شد
        </p>
        <VerificationInput
          length={4}
          validChars={'0-9'}
          placeholder={'-'}
          autoFocus={true}
          onChange={optInputChang}
          classNames={{
            container: "container",
            character: "character",
            characterInactive: "character--inactive",
            characterSelected: "character--selected",
          }}
        />
        {wrongotp &&
            <p className='text-red-800 mt-4 text-sm mr-5'>کد وارد شده صحیح نمیباشد</p>
        }
        <button className={`mt-12 btn btn-primary w-full cursor-pointer ${btnDisable && 'btn-disabled'}`}
          disabled={btnDisable}>{fakeloading ? 'در حال بررسی' : 'ورود'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default React.memo(OTP)
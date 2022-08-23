import React from "react";

interface Props {
  children: React.ReactNode
}

function AuthLayout({ children }: Props) {
  return (
    <div className="w-screen h-screen flex items-center justify-center authLayout-bg">
      <div className=" w-[90vw] md:w-[40vw] rounded-lg p-7 md:p-10 shadow-xl bg-white">
        {children}
      </div>
    </div>
  )
}

export default React.memo(AuthLayout)
import React from 'react'

interface Props {
	title: string
	subtitle?: string
	children: React.ReactNode
	close: () => void
}

function Modal(props: Props) {

	let { title, subtitle, children, close } = props

	return (
		<>
			<div
				className="fixed top-0 left-0  h-screen w-screen flex justify-center items-center  
			bg-black/40 backdrop-blur-[2px] transition-opacity duration-500 ease-in-out"
			>
				<div onClick={() => close()} className="absolute w-full h-full "></div>
				<div className="absolute top-[20%] md:w-[40vw] w-[85vw] md:m-h-[30vh]  z-10 ">
					<div className="rounded-[16px] p-6 bg-white ">
						<div className="flex justify-between items-center ">
							<div>
								<h2 className="text-[24px] font-bold">{title}</h2>
								{subtitle && <p className="text-disabled">{subtitle}</p>}
							</div>
							<span className="icon icon-cross-circular cursor-pointer" onClick={() => close()}></span>
						</div>
						{children}
					</div>
				</div>
			</div>
		</>
	)
}

export default React.memo(Modal)

import React from 'react'
import './loader.css'

export const FullscreenLoader: React.FC = () => {
	return (
		<div className='flex justify-center  items-center w-full h-screen my-auto fixed inset-0 z-20 bg-[var(--root)]'>
			<div className='flex flex-col gap-2 items-center'>
				<div
					aria-label='Orange and tan hamster running in a metal wheel'
					role='img'
					className='wheel-and-hamster'
				>
					<div className='wheel'></div>
					<div className='hamster'>
						<div className='hamster__body'>
							<div className='hamster__head'>
								<div className='hamster__ear'></div>
								<div className='hamster__eye'></div>
								<div className='hamster__nose'></div>
							</div>
							<div className='hamster__limb hamster__limb--fr'></div>
							<div className='hamster__limb hamster__limb--fl'></div>
							<div className='hamster__limb hamster__limb--br'></div>
							<div className='hamster__limb hamster__limb--bl'></div>
							<div className='hamster__tail'></div>
						</div>
					</div>
					<div className='spoke'></div>
				</div>
				<h1 className='text-2xl font-bold'>
					Немного подождите, стараемся загрузить страницу как можно быстрее!
				</h1>
			</div>
		</div>
	)
}

const Auth = () => {
	return (
		<div>
			<div className='flex justify-center items-center min-h-screen bg-slate-100'>
				<div className='absolute inset-0 flex flex-col'>
					<div className='h-2/5 bg-slate-800' />
				</div>
				<div className='relative flex justify-center items-center min-h-screen'>
					<form className='bg-slate-200 px-8 py-7 rounded-[10px] shadow-md w-[360px] flex flex-col gap-10'>
						<h2 className='text-2xl font-medium text-center text-zinc-900'>
							Авторизация
						</h2>
						<div className='flex flex-col gap-9 pt-8 pb-[10px]'>
							<div className='flex flex-col gap-1'>
								<label className='block text-sm text text-zinc-900'>
									Почта
								</label>
								<input
									placeholder='Почта'
									className='bg-[#C9CFD8] placeholder:text-[#888F99] text-sm text-zinc-900 pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none'
								/>
							</div>
							<div className='flex flex-col gap-1'>
								<label className='block text-sm text text-zinc-900'>
									Пароль
								</label>
								<input
									placeholder='Пароль'
									className='bg-[#C9CFD8] placeholder:text-[#888F99] text-sm text-zinc-900 pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none'
								/>
							</div>
						</div>
						<div className='block mx-auto'>
							<button className='px-6 py-2 rounded-md font-medium text-base transition duration-200 bg-slate-300 text-zinc-900 hover:bg-slate-400'>
								Войти
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Auth;

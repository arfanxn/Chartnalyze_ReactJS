import CLogo from '@/components/CLogo'

const Header = () => {
    const appName = import.meta.env.VITE__APP_NAME

    return (
        <header className="fixed inset-x-0 top-0 z-50 flex flex-row items-center border-b border-black/25 bg-white px-4 py-2 md:px-8 md:py-2">
            <div className="ml-[-0.5rem] inline-flex items-center">
                <figure className="flex size-14 items-center justify-center md:size-14">
                    <CLogo className="text-primary size-full" />
                </figure>
                <h1 className="text-lg font-bold md:text-2xl">{appName}</h1>
            </div>
        </header>
    )
}

export default Header

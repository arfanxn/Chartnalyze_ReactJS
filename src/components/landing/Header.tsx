import TheLogo from '@/components/TheLogo'
import classNames from 'classnames'
import { ClassNameProps } from '@/types/componentTypes'

type Props = ClassNameProps & {}

const Header = ({ className }: Props) => {
    const appName = import.meta.env.VITE__APP_NAME

    return (
        <header
            className={classNames(
                'fixed inset-x-0 top-0 z-50 flex flex-row items-center border-b border-black/25 bg-white px-4 py-2 md:px-8',
                className,
            )}
        >
            <div className="inline-flex items-center">
                <figure className="flex max-w-6 items-center justify-center md:max-w-8">
                    <TheLogo />
                </figure>
                <h1 className="text-lg font-bold md:text-2xl">{appName}</h1>
            </div>
        </header>
    )
}

export default Header

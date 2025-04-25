import CButtonIconned from '@/components/CButtonIconned'
import CImage from '@/components/CImage'

const Hero = () => {
    return (
        <section className="flex min-h-[100vh] flex-row items-center justify-between gap-x-8">
            <div className="w-full space-y-4 md:w-7/10 md:space-y-8">
                <h2 className="text-4xl font-bold md:text-6xl">
                    Financial education app in one platform
                </h2>
                <p className="text-lg font-light md:text-2xl">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Suscipit alias nulla natus doloremque ipsum eligendi
                    necessitatibus accusantium laudantium, nesciunt laboriosam,
                    atque illum expedita magni perspiciatis.
                </p>

                <CButtonIconned
                    label="Download"
                    labelClassname="text-lg md:text-2xl font-light"
                    icon="lucide:download"
                    iconClassName="text-lg md:text-2xl"
                />
            </div>

            <figure className="hidden flex-row justify-end md:flex md:w-3/10">
                <CImage className="h-[400px]" src="/images/landing/hero.png" />
            </figure>
        </section>
    )
}

export default Hero

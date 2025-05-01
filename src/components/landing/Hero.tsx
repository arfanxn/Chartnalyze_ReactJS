import CButtonIconned from '@/components/CButtonIconned'
import CImage from '@/components/CImage'

const Hero = () => {
    return (
        <section className="flex min-h-[100vh] flex-row items-center justify-between gap-x-8">
            <div className="w-full space-y-4 md:w-7/10 md:space-y-8">
                <h2 className="text-4xl font-bold md:text-6xl">
                    AI-driven market analysis & financial education.
                </h2>
                <p className="text-lg font-light md:text-2xl">
                    Chartnalyze combines AI-powered market analysis with
                    easy-to-understand financial education, helping both
                    beginners and experts make confident, data-driven investment
                    decisions in real-time.
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

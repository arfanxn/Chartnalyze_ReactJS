import CImage from '../CImage'

export default function TestimonySection() {
    const testimony = `Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Quibusdam, necessitatibus. Natus libero architecto
                        dolores voluptatum quaerat placeat, deserunt temporibus
                        est harum nesciunt repellat quasi fuga tempore assumenda
                        aspernatur? Assumenda, perspiciatis.`

    return (
        <section className="space-y-8">
            <h3 className="text-2xl font-bold md:text-4xl">
                The Testimony
            </h3>

            <div className="flex flex-col gap-y-4 md:flex-row md:items-center md:gap-x-8">
                <figure className="flex flex-row items-center justify-center md:w-4/10">
                    <CImage
                        className="aspect-auto h-[150px] md:h-[250px]"
                        src="/images/landing/testimony.png"
                    />
                </figure>
                <div className="md:w-6/10">
                    <p className="text-base font-semibold md:text-2xl">
                        "{testimony}"
                    </p>
                </div>
            </div>
        </section>
    )
}

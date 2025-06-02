import classNames from 'classnames'
import CCard from '@/shared/components/CCard'
import CImage from '@/shared/components/CImage'
import { isEven } from '@/shared/utils/booleanUtils'

export default function ServicesGrid() {
    const services = [
        {
            label: 'Chartanalyze AI',
            imageUrl: '/images/landing/chart-detection-black.png',
        },
        {
            label: 'Assets Comparison',
            imageUrl: '/images/landing/assets-white.png',
        },
        {
            label: 'Assets Heatmap',
            imageUrl: '/images/landing/heatmap-black.png',
        },
        {
            label: 'Chat Bot',
            imageUrl: '/images/landing/chatbot-white.png',
        },
    ]

    return (
        <section className="space-y-8">
            <h3 className="text-2xl font-bold md:text-4xl">Features</h3>

            <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
                {services.map(({ label, imageUrl }, index) => (
                    <li key={index}>
                        <CCard
                            className={classNames(
                                'relative flex flex-row justify-between p-4',
                                isEven(index + 1) ? 'bg-primary' : 'bg-white',
                            )}
                        >
                            <div>
                                <h4
                                    className={classNames(
                                        'text-lg font-light md:text-2xl',
                                        isEven(index + 1)
                                            ? 'text-white'
                                            : 'text-black',
                                    )}
                                >
                                    {label}
                                </h4>
                            </div>
                            <div className="flex flex-row justify-end">
                                <CImage
                                    className="size-24 md:size-38"
                                    src={imageUrl}
                                    alt="ALT"
                                />
                            </div>
                        </CCard>
                    </li>
                ))}
            </ul>
        </section>
    )
}

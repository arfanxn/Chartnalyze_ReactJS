import classNames from 'classnames'
import CCard from '../CCard'
import { isEven } from '@/utils/booleanUtils'
import CIcon from '../CIcon'

export default function ServicesGrid() {
    const services = [
        {
            label: 'Lorem Ipsum',
            icon: 'mdi:gold',
        },
        {
            label: 'Lorem Ipsum Dolor',
            icon: 'cryptocurrency:btc',
        },
        {
            label: 'Lorem Ipsum Dolor Sit',
            icon: 'simple-icons:apple',
        },
        {
            label: 'Lorem Ipsum Dolor Sit Amet',
            icon: 'cryptocurrency:eth',
        },
    ]

    return (
        <section className="space-y-8">
            <h3 className="text-2xl font-bold md:text-4xl">Features</h3>

            <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {services.map(({ label, icon }, index) => (
                    <li key={icon}>
                        <CCard
                            className={classNames(
                                'relative p-4',
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
                                <CIcon
                                    icon={icon}
                                    className={classNames(
                                        'text-4xl md:text-6xl',
                                        isEven(index + 1)
                                            ? 'text-white'
                                            : 'text-black',
                                    )}
                                />
                            </div>
                        </CCard>
                    </li>
                ))}
            </ul>
        </section>
    )
}

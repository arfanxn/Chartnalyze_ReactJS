import CIcon from '@/components/CIcon'

export default function AssetsSection() {
    const assets = [
        {
            label: 'Cryptocurrencies',
            icon: 'cryptocurrency:btc',
        },
        {
            label: 'Fiats',
            icon: 'lucide:dollar-sign',
        },
        {
            label: 'RWAs',
            icon: 'mdi:gold',
        },
        {
            label: 'Stocks',
            icon: 'simple-icons:apple',
        },
    ]

    return (
        <section className="space-y-8">
            <h3 className="text-2xl font-bold md:text-4xl">Analyze Assets</h3>
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
                {Object.values(assets).map(({ label, icon }) => (
                    <li
                        key={label}
                        className="flex flex-col items-center gap-y-2 md:gap-y-4"
                    >
                        <CIcon icon={icon} className="text-4xl md:text-6xl" />
                        <h4 className="text-lg font-bold md:text-2xl">
                            {label}
                        </h4>
                    </li>
                ))}
            </ul>
        </section>
    )
}

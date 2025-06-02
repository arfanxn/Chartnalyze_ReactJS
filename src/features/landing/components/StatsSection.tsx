import CIcon from '@/shared/components/CIcon'

export default function StatsSection() {
    const stats = [
        {
            label: 'Downloads',
            value: 7000,
            icon: 'lucide:download',
        },
        {
            label: 'Active Users',
            value: 1000,
            icon: 'lucide:user-round-check',
        },
        {
            label: 'Reviews',
            value: 2173,
            icon: 'lucide:star',
        },
    ]

    return (
        <section className="space-y-8">
            <h3 className="text-2xl font-bold md:text-4xl">The Statistics</h3>
            <ul className="grid grid-cols-3 gap-4 md:grid-cols-3 md:gap-8">
                {stats.map(({ label, value, icon }) => (
                    <li key={label} className="flex flex-col items-center">
                        <CIcon icon={icon} className="text-4xl md:text-6xl" />
                        <span className="text-2xl font-bold md:text-6xl">
                            {value}
                        </span>
                        <h4 className="text-lg font-bold md:text-2xl">
                            {label}
                        </h4>
                    </li>
                ))}
            </ul>
        </section>
    )
}

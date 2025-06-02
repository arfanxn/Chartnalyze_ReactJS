import CCard from '@/shared/components/CCard'
import classNames from 'classnames'
import CButtonIconned from '@/shared/components/CButtonIconned'

export default function DownloadSection() {
    const appName = import.meta.env.VITE__APP_NAME
    const downloadUrls = [
        {
            url: '',
            label: 'Install on Android',
            icon: 'simple-icons:googleplay',
        },
        {
            url: '',
            label: 'Install on iOS (soon)',
            icon: 'simple-icons:appstore',
        },
    ]

    return (
        <section>
            <CCard
                className={classNames(
                    'bg-primary relative space-y-2 px-8 py-8 md:space-y-4 md:py-16',
                )}
            >
                <h3 className="text-2xl font-bold text-white md:text-4xl">
                    Download {appName} now !
                </h3>
                <p className="text-lg font-light text-white md:text-2xl">
                    Our app is available on Android and iOS
                </p>

                <div className="flex flex-row flex-wrap gap-2 md:absolute md:right-8 md:bottom-16 md:flex md:flex-col md:flex-nowrap md:gap-4">
                    {downloadUrls.map(({ label, icon }) => (
                        <CButtonIconned
                            key={label}
                            className="justify-between bg-white! text-black!"
                            label={label}
                            labelClassName="text-lg md:text-xl font-light"
                            icon={icon}
                            iconClassName="text-lg md:text-xl"
                        />
                    ))}
                </div>
            </CCard>
        </section>
    )
}

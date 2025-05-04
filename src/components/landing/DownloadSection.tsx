import CCard from '@/components/CCard'
import classNames from 'classnames'
import CButtonIconned from '../CButtonIconned'

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

/*
import CCard from '@/components/CCard'
import classNames from 'classnames'
import CButtonIconned from '../CButtonIconned'

export default function DownloadSection() {
    const downloadUrls = [
        {
            os: 'Android',
            url: '',
            icon: 'simple-icons:googleplay',
        },
        {
            os: 'iOS',
            url: '',
            icon: 'simple-icons:appstore',
        },
    ]

    return (
        <section>
            <CCard
                className={classNames(
                    'bg-primary relative space-y-4 px-8 py-16',
                )}
            >
                <h3 className="text-4xl font-bold text-white">
                    Download {import.meta.env.VITE__APP_NAME} now !
                </h3>
                <p className="text-2xl font-light text-white">
                    Our app is available on Android and iOS
                </p>

                <div className="absolute right-8 bottom-16 flex flex-col gap-y-4">
                    {downloadUrls.map(({ os, icon }) => (
                        <CButtonIconned
                            className="justify-between bg-white! text-black!"
                            label={`Install on ${os}`}
                            labelClassName="text-xl font-light"
                            icon={icon}
                            iconClassName="text-xl"
                        />
                    ))}
                </div>
            </CCard>
        </section>
    )
}

*/

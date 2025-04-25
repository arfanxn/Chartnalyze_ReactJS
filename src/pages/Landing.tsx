import AssetsSection from '@/components/landing/AssetsSection'
import DownloadSection from '@/components/landing/DownloadSection'
import FAQsSection from '@/components/landing/FAQsSection'
import Hero from '@/components/landing/Hero'
import FeaturesSection from '@/components/landing/FeaturesSection'
import StatsSection from '@/components/landing/StatsSection'
import TestimonySection from '@/components/landing/TestimonySection'
import LandingLayout from '@/layouts/LandingLayout'

function Landing() {
    return (
        <LandingLayout className="space-y-16 md:space-y-24">
            <Hero />
            <AssetsSection />
            <FeaturesSection />
            <StatsSection />
            <TestimonySection />
            <FAQsSection />
            <DownloadSection />
        </LandingLayout>
    )
}

export default Landing

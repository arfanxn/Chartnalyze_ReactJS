import AssetsSection from '@/features/landing/components/AssetsSection'
import DownloadSection from '@/features/landing/components/DownloadSection'
import FAQsSection from '@/features/landing/components/FAQsSection'
import Hero from '@/features/landing/components/Hero'
import FeaturesSection from '@/features/landing/components/FeaturesSection'
import StatsSection from '@/features/landing/components/StatsSection'
import TestimonySection from '@/features/landing/components/TestimonySection'
import LandingLayout from '@/core/layouts/LandingLayout'

function Landing() {
    return (
        <LandingLayout>
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

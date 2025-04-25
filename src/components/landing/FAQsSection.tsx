import CCard from '@/components/CCard'
import classNames from 'classnames'

export default function FAQsSection() {
    const faqs = [
        {
            question: 'How can i invest or trade here?',
            answer: `No, you cannot. This app is designed solely as an educational and decision-making tool.`,
        },
        {
            question: 'Where does it come from?',
            answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
        },
        {
            question: 'Where can I get some?',
            answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, necessitatibus. Natus libero architecto`,
        },
    ]

    return (
        <section className="space-y-8">
            <h3 className="text-2xl font-bold md:text-4xl">FAQs</h3>

            <ul className="grid grid-cols-2 gap-x-8 md:grid-cols-3 md:gap-x-24">
                {faqs.map(({ question, answer }, index) => (
                    <li key={question}>
                        <CCard
                            className={classNames(
                                'size-full space-y-1 p-4 md:space-y-2',
                                index >= 2 ? 'hidden md:block' : 'block',
                            )}
                        >
                            <h4 className="text-lg font-semibold text-black md:text-2xl">
                                {question}
                            </h4>
                            <p className="text-lg font-light text-black md:text-2xl">
                                {answer}
                            </p>
                        </CCard>
                    </li>
                ))}
            </ul>
        </section>
    )
}

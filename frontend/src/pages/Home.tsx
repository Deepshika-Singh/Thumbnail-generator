import Hero from "../components/Hero";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Faq from "../components/Faq";
import Contact from "../components/Contact";

export default function Home() {
    return (
        <>
            <Hero />
            <Features />
            <Pricing />
            <section id="faq">
                <Faq />
            </section>
            <section id="contact">
                <Contact />
            </section>
        </>
    )
}
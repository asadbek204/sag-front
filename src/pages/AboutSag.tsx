import { Navbar } from "../components/Navbar"
import { Footer } from "../components/ui/Footer"
import AboutSagSection from "../screens/AboutSagPage/AboutSag"
import Gallery from "../screens/AboutSagPage/Gallery"
import ProductionSection from "../screens/AboutSagPage/ProductionSection"
import { ContactInfoSection } from "../screens/HomePage/sections/ContactInfoSection"



const AboutSag = () => {
  return (
    <div className="bg-[#FFFCE0]">
        <Navbar/>
         <AboutSagSection/>
         <ProductionSection/>
         <Gallery/>
         <ContactInfoSection/>
         <Footer/>
    </div>
  )
}

export default AboutSag
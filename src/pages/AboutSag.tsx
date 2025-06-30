import { Navbar } from "../components/Navbar"
import { Footer } from "../components/ui/Footer"
import AboutSagSection from "../screens/AboutSagPage/AboutSag"
import Gallery from "../screens/AboutSagPage/Gallery"
import ProductionSection from "../screens/AboutSagPage/ProductionSection"



const AboutSag = () => {
  return (
    <div>
        <Navbar/>
         <AboutSagSection/>
         <ProductionSection/>
         <Gallery/>
         <Footer/>
    </div>
  )
}

export default AboutSag
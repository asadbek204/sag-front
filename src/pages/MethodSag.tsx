import { Navbar } from "../components/Navbar"
import { Footer } from "../components/ui/Footer"
import { ContactInfoSection } from "../screens/HomePage/sections/ContactInfoSection"
import MethodSagPage from "../screens/MethodsPage/MethodPage"




const MethodSag = () => {
  return (
    <div>
        <Navbar/>
         <MethodSagPage/>
         <div className="bg-white">
        <ContactInfoSection />
      </div>
      <Footer/>
    </div>
  )
}

export default MethodSag
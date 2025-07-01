import { Navbar } from "../components/Navbar"
import { Footer } from "../components/ui/Footer"
import Catalog from "../screens/CatalogProductsPage/Catalog"
import { ContactInfoSection } from "../screens/HomePage/sections/ContactInfoSection"


const CatalogProducts = () => {
  return (
    <div>
        <Navbar/>
        <Catalog/>
        <ContactInfoSection/>
        <Footer/>
    </div>
  )
}

export default CatalogProducts
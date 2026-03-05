import Header from '../layout/Header'
import Footer from '../layout/Footer'
import HeroSection from '../components/restaurants/HeroSection'
import RestaurantGrid from '../components/restaurants/RestaurantGrid'
import RestaurantPartnershipCTA from '../components/restaurants/RestaurantPartnershipCTA'

export const Restaurant = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <RestaurantGrid />
      <RestaurantPartnershipCTA />
      <Footer />
    </>
  )
}

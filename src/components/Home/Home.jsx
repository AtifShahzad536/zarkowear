import React from 'react'
import Hero from '../Hero'
import TopSellingProducts from './Top'
import LimitedTimeOffer from './LimitedTimeOffer'
import FeaturedCategories from './Feature'
import Testimonials from './Customer'

function Home() {
  return (
    <div>
      <Hero/>
    <FeaturedCategories/>
    <TopSellingProducts/>
     <LimitedTimeOffer/>
    <Testimonials/>
    </div>
  )
}

export default Home
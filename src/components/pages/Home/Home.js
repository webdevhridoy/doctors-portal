import React from 'react';
import Banners from './Banners/Banners';
import Heros from './Heros/Heros';
import InfoCards from './InfoCards/InfoCards';
import MakeAppointment from './MakeAppointment/MakeAppointment';
import Services from './Services/Services';
import Testimonial from './Testimonial/Testimonial';

const Home = () => {
    return (
        <div className='mx-5'>
            <div className='py-20'><Banners></Banners></div>
            <div className='py-8'> <InfoCards></InfoCards></div>
            <div className='py-8'><Services></Services></div>
            <div className='py-8'><Heros></Heros></div>
            <div className='py-8'><MakeAppointment></MakeAppointment></div>
            <div className='py-8'><Testimonial></Testimonial></div>
        </div>
    );
};

export default Home;
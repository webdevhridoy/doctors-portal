import React from 'react';
import fluoride from '../../../../assets/images/fluoride.png';
import cavity from '../../../../assets/images/cavity.png';
import whitening from '../../../../assets/images/whitening.png';
import Service from './Service';


const Services = () => {

    const services = [
        {
            id: 1,
            title: 'Fluoride Treatment',
            text: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            icons: fluoride

        },
        {
            id: 2,
            title: 'Cavity Filling',
            text: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            icons: cavity

        },
        {
            id: 3,
            title: 'Teeth Whitening',
            text: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            icons: whitening

        },
    ];
    return (
        <div>
            <div className='my-20 text-center'>
                <h1 className="text-1xl font-bold text-primary">OUR SERVICES!</h1>
                <h1 className="text-4xl font-light text-accent">Services We Provide!</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 '>
                {
                    services.map(service => <Service
                        key={service.id}
                        service={service}
                    ></Service>)
                }
            </div>
        </div>
    );
};

export default Services;
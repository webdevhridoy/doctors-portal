import React from 'react';
import treatment from '../../../../assets/images/treatment.png';

const Heros = () => {
    return (
        <div className="hero bg-white">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='md:w-1/2 md:pl-10'>
                    <h1 className="text-5xl font-bold">Box Office News!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white uppercase">Get Started</button>
                </div>
                <img src={treatment} className="rounded-lg shadow-xl md:w-1/3" alt='' />
            </div>
        </div>
    );
};

export default Heros;
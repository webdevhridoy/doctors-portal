import React from 'react';

const Service = ({ service }) => {
    // console.log(service);
    const { icons, title, text } = service;
    return (
        <div className="card bg-base-100 shadow-xl rounded-lg text-center">
            <figure><img src={icons} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className='text-xl'>{title}</h2>
                <p>{text}</p>

            </div>
        </div>
    );
};

export default Service;
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Checkout from './Checkout';

const stripePromise = loadStripe('pk_test_51Io76EFe9X02hyfxVZXsDFf3unwvgWvOLQ2xEWwGMJerjP8FiTXRjpUF3yxdfjr0sIU2WyiV5gnh1r6Qf5CZVodN00lFph4UVi');
console.log(stripePromise);
const Payment = () => {
    const booking = useLoaderData();
    console.log(booking);
    const { appointmentDate, price, treatmentName, slot } = booking;
    return (
        <div>
            <h2>Payment for <span className='text-primary'>{treatmentName}</span></h2>
            <h2>Please pay <strong>${price}</strong> for your <span className='text-primary'> appointment on {appointmentDate}</span> at {slot}</h2>
            <div className='w-96 mt-20'>
                <Elements stripe={stripePromise}>
                    <Checkout
                        booking={booking}
                    ></Checkout>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
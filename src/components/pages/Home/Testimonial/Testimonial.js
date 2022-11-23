import React from 'react';
import quote from '../../../../assets/icons/quote.svg';
import people1 from '../../../../assets/images/people1.png';
import people2 from '../../../../assets/images/people2.png';
import people3 from '../../../../assets/images/people3.png';
import Review from './Review';

const Testimonial = () => {

    const reviews = [
        {
            id: 1,
            name: 'Winson Herry',
            review: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            location: 'California',
            image: people1
        },
        {
            id: 2,
            name: 'Winson Herry',
            review: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            location: 'California',
            image: people2
        },
        {
            id: 3,
            name: 'Winson Herry',
            review: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            location: 'California',
            image: people3
        },
    ];

    return (
        <section>
            <div className='flex justify-between items-center'>
                <div>
                    <h4 className='text-xl text-primary font-semibold'>Testimonial</h4>
                    <h2 className='text-accent text-2xl font-semibold capitalize'>What our patients says</h2>
                </div>
                <figure>
                    <img className='w-42 mg:w-48' src={quote} alt="" />
                </figure>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 '>
                {
                    reviews.map(rev => <Review
                        key={rev.id}
                        rev={rev}
                    ></Review>)
                }
            </div>
        </section>
    );
};

export default Testimonial;
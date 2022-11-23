import React from 'react';

import clock from '../../../../assets/icons/clock.svg';
import marker from '../../../../assets/icons/marker.svg';
import phone from '../../../../assets/icons/phone.svg';
import InfoCard from './InfoCard';

const InfoCards = ({ card }) => {

    const cards = [
        {
            id: 1,
            title: 'Opening Hours',
            text: 'Lorem Ipsum is simply dummy text of the pri',
            icons: clock,
            bgClass: 'bg-gradient-to-r from-primary to-secondary'
        },
        {
            id: 2,
            title: 'Visit our location',
            text: 'Lorem Ipsum is simply dummy text of the pri',
            icons: marker,
            bgClass: 'bg-accent'
        },
        {
            id: 3,
            title: 'Contact us now',
            text: '+088 1647 22 15 66',
            icons: phone,
            bgClass: 'bg-gradient-to-r from-primary to-secondary'
        }
    ];
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-white '>
            {
                cards.map(card => <InfoCard
                    key={card.id}
                    card={card}
                ></InfoCard>)
            }
        </div>
    );
};

export default InfoCards;
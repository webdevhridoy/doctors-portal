import React from 'react';

const InfoCard = ({ card }) => {
    const { title, text, icons, bgClass } = card;
    return (
        <div className={`card card-side shadow-xl ${bgClass} px-6`}>
            <figure><img src={icons} alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{text}</p>

            </div>
        </div>

    );
};

export default InfoCard;
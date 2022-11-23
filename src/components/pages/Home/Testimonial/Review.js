import React from 'react';

const Review = ({ rev }) => {
    console.log(rev);
    const { name, review, image, location } = rev;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <p>{review}</p>
                <div className=" flex justify-start items-center">
                    <div className="avatar">
                        <div className="w-12">
                            <img src={image} alt='' />
                        </div>
                    </div>
                    <div>
                        <h2 className="card-title">{name}</h2>
                        <small>{location}</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;
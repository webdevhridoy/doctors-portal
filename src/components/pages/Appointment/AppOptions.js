import React from 'react';

const AppOptions = ({ appOptions, setTreatments }) => {
    // console.log(appOptions);
    const { name, slots, price } = appOptions;
    return (
        <div>
            <div className="card-body items-center text-center border-2">
                <h2 className="card-title text-primary">{name}</h2>
                <p>{slots.length > 0 ? slots[0] : 'No booking date availabel today'}</p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} Available</p>
                <p>Price: {price}</p>
                <div className="card-actions">
                    <label disabled={slots.length === 0}
                        onClick={() => setTreatments(appOptions)}
                        htmlFor="my-modal-3" className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white uppercase">Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AppOptions;
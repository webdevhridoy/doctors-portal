import React, { useState } from 'react';
import { format } from 'date-fns';
import AppOptions from './AppOptions';
import BookingModal from './BookingModal';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../shared/Loading/Loading';

const AvailableAppointments = ({ selected }) => {
    const [treatments, setTreatments] = useState(null);
    const date = format(selected, 'PP');
    const { data: treatment = [], refetch, isLoading } = useQuery({
        queryKey: ['appointmentOptions', date],
        queryFn: () => fetch(`http://localhost:5000/appointmentOptions?date=${date}`)
            .then(res => res.json())
    });

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <div className='text-center text-primary py-20'>
                <h2>Available appointments on <span className='font-bold'>{format(selected, 'PP')}</span></h2>
            </div>
            <div className='space-y-16'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5 m-5 '>
                    {
                        treatment.map(appOptions =>
                            <AppOptions
                                key={appOptions._id}
                                appOptions={appOptions}
                                setTreatments={setTreatments}
                            ></AppOptions>
                        )
                    }
                </div>
                <div>
                    {treatments &&
                        <BookingModal
                            treatments={treatments}
                            selected={selected}
                            setTreatments={setTreatments}
                            refetch={refetch}
                        ></BookingModal>}
                </div>
            </div>
        </div>
    );
};

export default AvailableAppointments;
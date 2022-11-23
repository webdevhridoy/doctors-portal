import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthProvider';

const BookingModal = ({ treatments, selected, setTreatments, refetch }) => {
    const { name: treatmentName, slots, price } = treatments;
    const date = format(selected, 'PP');
    const { user } = useContext(AuthContext);

    const handleBooking = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const phone = form.phone.value;
        const email = form.email.value;
        const slot = form.slot.value;
        const details = { name, phone, slot, email };

        const booking = {
            appointmentDate: date,
            patientName: name,
            treatmentName: treatmentName,
            phone,
            email,
            slot,
            price
        };
        console.log(details, booking);

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setTreatments(null);
                    toast.success('Booking confirmed');
                    refetch();
                }
                else {
                    toast.error(data.message);
                }
            });
        //TODO: SEND DATA TO SERVER AND ONCE DATA IS SAVED AND CLOSE THE MODAL AND DISPLAY TOAST

    };

    return (
        <>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{treatmentName}</h3>

                    <form onSubmit={handleBooking} className='mt-10'>
                        <input disabled type="text" placeholder={date} className="input w-full border-accent my-2 text-black" />
                        <select name='slot' className="select select-bordered w-full">
                            <>{
                                slots.map((times, index) =>
                                    <option
                                        value={times}
                                        key={index}
                                    >{times}</option>
                                )
                            }
                            </>

                        </select>
                        <input readOnly defaultValue={user?.displayName} required name="name" type="text" placeholder="Full name" className="input w-full border-accent my-2 text-black" />

                        <input required name="phone" type="text" placeholder="Phone number" className="input w-full border-accent my-2 text-black" />

                        <input readOnly defaultValue={user?.email} required name="email" type="email" placeholder="Email" className="input w-full border-accent my-2 text-black" />

                        <input className="bg-accent text-white input w-full border-accent my-2" type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;
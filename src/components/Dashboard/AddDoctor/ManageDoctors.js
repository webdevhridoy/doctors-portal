import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../shared/ConfirmationModal/ConfirmationModal';

const ManageDoctors = () => {
    const [deleteDoctor, setDeleteDoctor] = useState(null);

    const closeModal = () => {
        setDeleteDoctor(null);
    };


    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('Access-Token')}`
                    }
                });
                const data = res.json();
                return data;

            }
            catch (error) {

            }
        }
    });

    const handleDeleteDoctor = (doctor) => {
        fetch(`http://localhost:5000/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('Access-Token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                refetch();
                if (data.deletedCount) {
                    toast.success('Doctor is deleted');
                }
            });

    };

    if (isLoading) {
        return <div className='flex h-screen justify-center items-center' role="status">
            <svg className="inline mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>;
    }
    return (
        <div>
            <h2 className='text-3xl'>Manage your doctors {doctors?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avater</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.length &&
                            doctors?.map((doctor, index) => <tr
                                key={doctor._id}
                            >
                                <th>{index + 1}</th>
                                <td><img className='w-14 rounded-full' src={doctor.image} alt="" /></td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialty}</td>
                                <td>
                                    <label onClick={() => setDeleteDoctor(doctor)} htmlFor="confirmationModal" className="px-2 py-1 rounded-md text-white bg-red-700 cursor-pointer">Delete</label>

                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deleteDoctor && <ConfirmationModal
                    title={`Are you sure to delete`}
                    message={`if you delete ${deleteDoctor.name}. It can not be undone`}
                    handleDeleteDoctor={handleDeleteDoctor}
                    modalData={deleteDoctor}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;
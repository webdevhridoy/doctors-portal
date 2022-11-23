import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate();
    const { data: specialties, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/appointment-specialty');
            const data = res.json();
            return data;
        }
    });

    if (isLoading) {
        return <div className='flex h-screen justify-center items-center' role="status">
            <svg className="inline mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>;
    }

    const handleAddDoctor = (data) => {
        console.log(data.image[0]);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?&key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                console.log(imgData);
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const doctors = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imgData.data.url
                    };

                    // save dotors information to the databse

                    fetch('http://localhost:5000/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('Access-Token')}`
                        },
                        body: JSON.stringify(doctors)

                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.acknowledged) {
                                toast.success('Your doctor has been added');
                                navigate('/dashboard/manage-doctors');
                            }
                        });
                }
            });
    };

    return (
        <div>
            <h2 className='text-3xl'>Add a New Doctor</h2>
            <div className='flex justify-start items-start p-2'>
                <div className='w-96'>
                    <h2 className='text-2xl text-center'>Sign up now</h2>
                    <form onSubmit={handleSubmit(handleAddDoctor)}>
                        <div className="form-control w-full  mt-2">
                            <label className="label"> <span className="label-text text-lg">Name</span> </label>
                            <input type='text'
                                {...register('name', {
                                    required: "Name should be added"
                                })}
                                placeholder="Type here" className="input input-bordered w-full" />

                            {errors.name && <p className='text-red-600' role="alert">{errors.name?.message}</p>}
                        </div>
                        <div className="form-control w-full  mt-2">
                            <label className="label"> <span className="label-text text-lg">Email</span> </label>
                            <input type='email'
                                {...register('email', {
                                    required: 'Email address is required'
                                })}
                                placeholder="Type here" className="input input-bordered w-full" />
                            {errors.email && <p className='text-red-600' role="alert">{errors.email?.message}</p>}

                        </div>
                        <div className="form-control w-full  mt-2">
                            <label className="label"> <span className="label-text text-lg">Specialty</span> </label>
                            <select
                                {...register('specialty')}
                                className="select select-bordered w-full">
                                {
                                    specialties?.map(specialty =>
                                        <option
                                            key={specialty._id}
                                            value={specialty.name}
                                        >{specialty.name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="form-control w-full  mt-2">
                            <label className="label"> <span className="label-text text-lg">Photo</span> </label>
                            <input type='file'
                                {...register('image', {
                                    required: "Photo should be uploaded"
                                })}
                                placeholder="Type here" className="input input-bordered w-full" />

                            {errors.img && <p className='text-red-600' role="alert">{errors.img?.message}</p>}
                        </div>
                        <input type="submit" className=" text-white text-center rounded-lg btn-md w-full mt-5 bg-accent cursor-pointer" value='Add Doctor' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDoctor;
import doctors from '../../../../assets/images/doctor.png';
import bgImage from '../../../../assets/images/appointment.png';
import PrimaryButton from '../../../smallComponents/PrimaryButton/PrimaryButton';

const MakeAppointment = () => {
    return (
        <section
            style={{
                background: `url(${bgImage})`
            }}>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row -mb-4">
                    <img src={doctors} className="rounded-lg hidden lg:block md:w-1/3 -mt-32 " alt='' />
                    <div className='md:w-1/2 md:pl-10'>
                        <h1 className="text-5xl font-bold text-white">Box Office News!</h1>
                        <p className="py-6 text-white">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <PrimaryButton>Get appointment</PrimaryButton>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default MakeAppointment;
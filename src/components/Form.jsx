import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMedicallyGetApi } from "../store/useMedicallyGetApi";
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

const SignUp = ({ showModalForm }) => {
    const { getMedicallyApi, resetMedically } = useMedicallyGetApi();
    const [error, setError] = useState('');

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            resetMedically();
            await getMedicallyApi(data); // Assuming getMedicallyApi is async
            reset();
            setError('');
            showModalForm();
        } catch (apiError) {
            setError('An error occurred while fetching data');
        }
    };

    return (
        <div className='w-4/4 bg-sky-300 p-10 rounded-lg'>
            <button onClick={showModalForm} className='bg-red-500 px-2  rounded-lg text-white mb-4 absolute right-2 top-2'>X</button>
            <form className='w-4/4' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        type="text"
                        placeholder="Write a medically"
                        {...register("name", {
                            required: 'Field obligated',
                            maxLength: { value: 15, message: 'El nombre debe tener menos de 15 caracteres' }
                        })}
                    />
                    {errors.name && <p className="error-message bg-red-400 text-white text-center">{errors.name.message}</p>}
                </div>
                <div className="flex justify-center text-center mt-4 w-5/5">
                    <Button type="submit" variant="contained">Send</Button>
                </div>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};
SignUp.propTypes = {
    showModalForm: PropTypes.func.isRequired,
};
export default SignUp;

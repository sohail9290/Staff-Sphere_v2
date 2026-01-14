import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    const navigate = useNavigate();

    const handleSuccess = async (response) => {
        const res = await axios.post(
            'https://staff-sphere-v2.onrender.com/api/auth/google',
            { token: response.credential }
        );

        localStorage.setItem('token', res.data.token);
        navigate('/employees'); 
    };

    return <GoogleLogin onSuccess={handleSuccess} />;
};

export default LoginComponent;


import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    const navigate = useNavigate();

    const handleSuccess = async (response) => {
        try {
            const res = await axios.post(
                'https://staff-sphere-v2.onrender.com/api/auth/google',
                { token: response.credential }
            );

            localStorage.setItem('token', res.data.token);

            // ✅ SPA navigation (NO PAGE RELOAD)
            navigate('/employees');

        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => alert('Google Login Failed')}
        />
    );
};

export default LoginComponent;

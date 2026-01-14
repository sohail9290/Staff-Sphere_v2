import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoginComponent = () => {
    const navigate = useNavigate();

    const handleSuccess = async (response) => {
        try {
            const res = await axios.post(
                'https://staff-sphere-v2.onrender.com/api/auth/google',
                { token: response.credential }
            );

            localStorage.setItem('token', res.data.token);
            navigate('/employees');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again.');
        }
    };

    const handleError = () => {
        alert('Google Login Failed. Please try again.');
    };

    return (
        <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
            <motion.div
                className="card shadow p-4"
                style={{ width: "400px" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="text-center mb-4">
                    <div className="mx-auto mb-3" style={{ width: 56, height: 56 }}>
                        <img
                            src="/staff-sphere-logo.svg"
                            alt="StaffSphere Logo"
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                    </div>

                    <h3>Welcome to StaffSphere</h3>
                    <p className="text-muted">Sign in to manage your team</p>
                </div>

                <div className="d-flex justify-content-center">
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default LoginComponent;

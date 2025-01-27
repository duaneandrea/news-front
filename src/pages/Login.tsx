import { useNavigate } from 'react-router-dom';
import { login } from '../api/api';
import * as React from "react";
import { useState } from "react";
import { Form, Button, Alert } from 'react-bootstrap';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            localStorage.setItem('token', response.token);
            navigate('/feed');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="login-page sp bg-cover" style={{ backgroundImage: 'url(assets/img/bg/login-page-bg.jpg)' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 m-auto">
                        <div className="login-form">
                            <h3>Welcome Back</h3>
                            <p>Please fill your email and password to sign in.</p>
                            <Form onSubmit={handleLogin}>
                                <div className="single-input">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="single-input">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="button mt-30">
                                    <Button variant="primary" type="submit" className="theme-btn1">
                                        Sign In
                                    </Button>
                                </div>
                            </Form>
                            {error && <Alert variant="danger">{error}</Alert>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

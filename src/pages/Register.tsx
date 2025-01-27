import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/api';
import * as React from "react";
import {Form, Button, Alert } from 'react-bootstrap';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await register(name, email, password,passwordConfirm);
            localStorage.setItem('token', response.token);
            navigate('/feed');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="login-page sp bg-cover" style={{ backgroundImage: 'url(assets/img/bg/login-page-bg.jpg)' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 m-auto">
                        <div className="login-form">
                            <h3>Create an Account</h3>
                            <p>Please fill in the details below to register.</p>
                            <Form onSubmit={handleRegister}>
                                <div className="single-input">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="single-input">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
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

                                <div className="single-input">
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password again"
                                        value={passwordConfirm}
                                        onChange={(e) => setPasswordConfirm(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="button mt-30">
                                    <Button variant="primary" type="submit" className="theme-btn1">
                                        Register
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

export default Register;

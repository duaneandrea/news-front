import { useState, useEffect } from 'react';
import * as React from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import api from '../api/api';

const Preferences: React.FC = () => {
    const [preferences, setPreferences] = useState({ source_id: '', category_id: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                const response = await api.get('/preferences', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                if (response.data.length > 0) {
                    setPreferences({
                        source_id: response.data[0].source_id,
                        category_id: response.data[0].category_id,
                    });
                }
            } catch (err: any) {
                setError('Error fetching preferences');
            }
        };

        fetchPreferences();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await api.post('/preferences', preferences, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setSuccess('Preferences updated successfully!');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error updating preferences');
        }
    };

    return (
        <div className="preferences-page sp bg-cover" style={{ backgroundImage: 'url(assets/img/bg/preferences-page-bg.jpg)' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 m-auto">
                        <div className="preferences-form">
                            <h3>Update Your Preferences</h3>
                            <p>Select your preferences and save changes.</p>
                            {success && <Alert variant="success">{success}</Alert>}
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <div className="single-input">
                                    <Form.Label>Source</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={preferences.source_id}
                                        onChange={(e) => setPreferences({ ...preferences, source_id: e.target.value })}
                                        required
                                    >
                                        <option value="">All Sources</option>
                                        <option value="1">News API</option>
                                        <option value="2">The Guardian</option>
                                        <option value="3">New York Times</option>
                                        {/* Add more source options here */}
                                    </Form.Control>
                                </div>
                                <div className="single-input">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={preferences.category_id}
                                        onChange={(e) => setPreferences({ ...preferences, category_id: e.target.value })}
                                        required
                                    >
                                        <option value="">All Categories</option>
                                        <option value="1">Uncategorized</option>
                                        <option value="2">Technology</option>
                                        {/* Add more category options here */}
                                    </Form.Control>
                                </div>

                                <div className="button mt-30">
                                    <Button variant="primary" type="submit" className="theme-btn1">
                                        Save Preferences
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preferences;
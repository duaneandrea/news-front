
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import PersonalizedFeed from './pages/PersonalizedFeed';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import AppNavbar from './components/Navbar';
import * as React from "react";
import Preferences from "./pages/Preferences.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <AppNavbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/articles/:slug" element={<ArticleDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/preferences" element={
                    <ProtectedRoute>
                        <Preferences />
                    </ProtectedRoute>
                } />
                <Route
                    path="/feed"
                    element={
                        <ProtectedRoute>
                            <PersonalizedFeed />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;

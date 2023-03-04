import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from './routes/MainPage';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import SurveyListPage from './routes/SurveyPages/SurveyListPage';
import SurveyPage from './routes/SurveyPages/SurveyPage';
import SurveyFormPage from './routes/SurveyPages/SurveyFormPage';
import SurveyLoginReqPage from './routes/SurveyPages/SurveyLoginReqPage';
import ProfilePage from './routes/MyPages/ProfilePage';
import AuthListPage from './routes/MyPages/AuthListPage';
import SurveyResPage from './routes/MyPages/SurveyResPage';
import NotFound from './routes/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/survey" element={<SurveyListPage />} />
        <Route path="/survey/:id" element={<SurveyPage />} />
        <Route path="/survey/form" element={<SurveyFormPage />} />
        <Route path="/survey/login-required" element={<SurveyLoginReqPage />} />
        <Route path="/mypage/:id" element={<ProfilePage />} />
        <Route path="/mypage/auth-list" element={<AuthListPage />} />
        <Route path="/mypage/survey-result/:id" element={<SurveyResPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

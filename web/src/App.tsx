import React from 'react';

import { Routes, Route } from 'react-router-dom';

import LoginPage from './routes/LoginPage';
import MainPage from './routes/MainPage';
import AuthListPage from './routes/MyPages/AuthListPage';
import ProfilePage from './routes/MyPages/ProfilePage';
import SurveyResultPage from './routes/MyPages/SurveyResultPage';
import NotFound from './routes/NotFound';
import RegisterPage from './routes/RegisterPage';
import SurveyFormPage from './routes/SurveyPages/SurveyFormPage';
import SurveyListPage from './routes/SurveyPages/SurveyListPage';
import SurveyLoginRequiredPage from './routes/SurveyPages/SurveyLoginRequiredPage';
import SurveyPage from './routes/SurveyPages/SurveyPage';

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
        <Route path="/survey/login-required" element={<SurveyLoginRequiredPage />} />
        <Route path="/mypage" element={<ProfilePage />} />
        <Route path="/mypage/auth-list" element={<AuthListPage />} />
        <Route path="/mypage/survey-result/:id" element={<SurveyResultPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

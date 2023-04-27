import React from 'react';

import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './components/GlobalStyle';
import ProtectedRoute from './contexts/ProtectedRoute';
import { AuthProvider } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
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
  const [theme] = useTheme();

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/survey"
            element={
              <ProtectedRoute>
                <SurveyListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/survey/:id"
            element={
              <ProtectedRoute>
                <SurveyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/survey/form"
            element={
              <ProtectedRoute>
                <SurveyFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/survey/login-required"
            element={
              <ProtectedRoute>
                <SurveyLoginRequiredPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mypage/auth-list"
            element={
              <ProtectedRoute>
                <AuthListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mypage/survey-result/:id"
            element={
              <ProtectedRoute>
                <SurveyResultPage />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

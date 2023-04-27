import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

/**
 * The protected route that should be only allowed for authenticated users.
 * This requires user's current signed in state.
 *
 * @param {JSX.Element} children - Page to be protected but only allowed for authenticated users.
 * @returns
 */
export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const prevRoute = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ prevRoute }} />;
  }

  return children;
}

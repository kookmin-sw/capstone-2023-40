import React from 'react';

import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { RootState } from '../reducers';

/**
 * The protected route that should be only allowed for authenticated users.
 * This requires user's current signed in state.
 *
 * @param {JSX.Element} children - Page to be protected but only allowed for authenticated users.
 * @returns
 */
export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth.isLoggedIn);
  const prevRoute = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ prevRoute }} />;
  }

  return children;
}

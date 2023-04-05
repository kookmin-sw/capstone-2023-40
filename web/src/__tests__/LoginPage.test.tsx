import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import LoginPage from '../routes/LoginPage';
import RegisterPage from '../routes/RegisterPage';

describe('[LoginPage Test]', () => {
  it('renders LoginPage', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <LoginPage />
      </MemoryRouter>
    );

    const appTitle = screen.getByText('회원가입');

    expect(appTitle).toBeInTheDocument();
  });

  /**
   * If Click the '회원가입'Button at LoginPage,
   * Checking translated RegisterPage location Path.
   */
  it('clicks to navigate to register page', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </MemoryRouter>
    );
    const navigateToRegisterButton = await waitFor(() => screen.getByRole('button', { name: '회원가입' }));
    await act(async () => {
      fireEvent.click(navigateToRegisterButton);
    });

    // FIXME: do not translate location path.
    // expect(window.location.pathname).toBe('/register');
    expect(screen.getByText('회원가입 완료하기')).toHaveTextContent('회원가입 완료하기');
  });
});

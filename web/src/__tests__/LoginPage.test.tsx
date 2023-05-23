import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '../reducers/store';
import LoginPage from '../routes/LoginPage';
import MainPage from '../routes/MainPage';
import RegisterPage from '../routes/RegisterPage';

describe('[LoginPage Test]', () => {
  it('renders LoginPage', () => {
    render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MemoryRouter initialEntries={['/login']}>
            <LoginPage />
          </MemoryRouter>
        </PersistGate>
      </Provider>
    );

    const appTitle = screen.getByRole('button', { name: '로그인' });

    expect(appTitle).toBeInTheDocument();
  });

  /**
   * If you write email & password in InputLabel,
   * checking the correct inputValue.
   */
  it('should update onchange', () => {
    const { container } = render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MemoryRouter initialEntries={['/login']}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </MemoryRouter>
        </PersistGate>
      </Provider>
    );
    const email = () => container.querySelector('input[name="email"]') as HTMLInputElement;
    const password = () => container.querySelector('input[name="password"]') as HTMLInputElement;

    fireEvent.change(email(), { target: { value: 'user@test.com' } });
    fireEvent.change(password(), { target: { value: 'Test1234' } });

    expect(email().value).toBe('user@test.com');
    expect(password().value).toBe('Test1234');
  });

  /**
   * Click the '로그인'Button at LoginPage, If emailInput & PasswordInput isEmpty,
   * Checking LoginError Message.
   */
  it('check LoginError Message if emailInput isEmpty', async () => {
    const { container } = render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MemoryRouter initialEntries={['/login']}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </MemoryRouter>
        </PersistGate>
      </Provider>
    );
    const email = () => container.querySelector('input[name="email"]') as HTMLInputElement;
    const password = () => container.querySelector('input[name="password"]') as HTMLInputElement;
    const isEmpty = !email().value || !password().value;

    fireEvent.change(password(), { target: { value: 'Test1234' } });
    fireEvent.change(email(), { target: { value: '' } });
    fireEvent.blur(email());
    const loginButton = await waitFor(() => screen.getByRole('button', { name: '로그인' }));
    await act(async () => {
      fireEvent.click(loginButton);
    });
    if (isEmpty) {
      const error = await screen.getByText('로그인 오류');
      expect(error).toBeInTheDocument();
    }
  });

  it('check LoginError Message if PasswordInput isEmpty', async () => {
    const { container } = render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MemoryRouter initialEntries={['/login']}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </MemoryRouter>
        </PersistGate>
      </Provider>
    );
    const email = () => container.querySelector('input[name="email"]') as HTMLInputElement;
    const password = () => container.querySelector('input[name="password"]') as HTMLInputElement;
    const isEmpty = !email().value || !password().value;
    fireEvent.change(email(), { target: { value: 'user@test.com' } });
    fireEvent.change(password(), { target: { value: '' } });
    fireEvent.blur(password());

    const loginButton = await waitFor(() => screen.getByRole('button', { name: '로그인' }));
    await act(async () => {
      fireEvent.click(loginButton);
    });

    if (isEmpty) {
      const error = await screen.getByText('로그인 오류');
      expect(error).toBeInTheDocument();
    }
  });

  /**
   * If Click the '회원가입'Button at LoginPage,
   * Checking translated RegisterPage location Path.
   */
  it('clicks to navigate to register page', async () => {
    render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MemoryRouter initialEntries={['/login']}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </MemoryRouter>
        </PersistGate>
      </Provider>
    );

    const navigateToRegisterButton = await waitFor(() => screen.getByRole('button', { name: '회원가입' }));
    await act(async () => {
      fireEvent.click(navigateToRegisterButton);
    });

    expect(screen.getByText('회원가입')).toHaveTextContent('회원가입');
  });

  // FIXME: should be modified to API call
  /**
   * If Click the '로그인'Button at LoginPage,
   * Checking translated SurveyListPage location Path.
   */
  it('clicks to navigate to survey page', async () => {
    const { container } = render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MemoryRouter initialEntries={['/login']}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<MainPage />} />
            </Routes>
          </MemoryRouter>
        </PersistGate>
      </Provider>
    );
    const email = () => container.querySelector('input[name="email"]') as HTMLInputElement;
    const password = () => container.querySelector('input[name="password"]') as HTMLInputElement;
    fireEvent.change(email(), { target: { value: 'userTest1234@gmail.com ' } });
    fireEvent.change(password(), { target: { value: 'Test1234!' } });

    const navigateToRegisterButton = await waitFor(() => screen.getByRole('button', { name: '로그인' }));
    await act(async () => {
      fireEvent.click(navigateToRegisterButton);
    });

    expect(screen.getByText('회원가입')).toHaveTextContent('회원가입');
  });
});

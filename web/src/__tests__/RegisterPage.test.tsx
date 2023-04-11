import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import MainPage from '../routes/MainPage';
import RegisterPage from '../routes/RegisterPage';

describe('[RegisterPage Test]', () => {
  it('renders RegisterPage', () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <RegisterPage />
      </MemoryRouter>
    );

    const appTitle = screen.getByText('회원가입');

    expect(appTitle).toBeInTheDocument();
  });

  /**
   * If you write All Input value in InputLabel
   * checking the correct inputValue.
   * Input Value : [ Email, Password, ConfirmPassword, Name, PhoneNumber, Key ]
   */
  it('should update onchange', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/register']}>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </MemoryRouter>
    );
    const email = () => container.querySelector('input[name="email"]') as HTMLInputElement;
    const password = () => container.querySelector('input[name="password"]') as HTMLInputElement;
    const confirmPassword = () => container.querySelector('input[name=confirmPassword]') as HTMLInputElement;
    const name = () => container.querySelector('input[name="name"]') as HTMLInputElement;
    const phoneNumber = () => container.querySelector('input[name="phoneNumber"]') as HTMLInputElement;
    const key = () => container.querySelector('input[name="key"]') as HTMLInputElement;

    fireEvent.change(email(), { target: { value: 'user@test.com' } });
    fireEvent.change(password(), { target: { value: 'Test1234' } });
    fireEvent.change(confirmPassword(), { target: { value: 'TestConfirm1234' } });
    fireEvent.change(name(), { target: { value: 'nameTest' } });
    fireEvent.change(phoneNumber(), { target: { value: '01012345678' } });
    fireEvent.change(key(), { target: { value: '1234' } });

    expect(email().value).toBe('user@test.com');
    expect(password().value).toBe('Test1234');
    expect(confirmPassword().value).toBe('TestConfirm1234');
    expect(name().value).toBe('nameTest');
    expect(phoneNumber().value).toBe('01012345678');
    expect(key().value).toBe('1234');
  });

  /**
   * Checking emailInputValue has matching Email Regex.
   */
  it('checking emailInputValue has matching Email Regex', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/register']}>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </MemoryRouter>
    );
    const email = () => container.querySelector('input[name="email"]') as HTMLInputElement;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // False-Test) value : 'Test1234'
    fireEvent.change(email(), { target: { value: 'Test1234' } });
    expect(emailRegex.test(email().value)).toBe(false);

    // True-Test) value : 'Test1234@gmail.com'
    fireEvent.change(email(), { target: { value: 'Test1234@gmail.com' } });
    expect(emailRegex.test(email().value)).toBe(true);
  });

  /**
   * Checking password confirm List
   * 1) password InputValue isEmpty
   * 2) confirmPassword InputValue isEmpty
   * 3) password InputValue is matched password-Regex
   * 4) Check password & confirmPassword InputValue is same
   */
  it('checking password & confirmPassword InputValue', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/register']}>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </MemoryRouter>
    );
    const password = () => container.querySelector('input[name="password"]') as HTMLInputElement;
    const confirmPassword = () => container.querySelector('input[name=confirmPassword]') as HTMLInputElement;
    const confirmPasswordButton = screen.getByRole('button', { name: '비밀번호 확인' });

    // 1) password InputValue isEmpty
    fireEvent.change(password(), { target: { value: '' } });
    fireEvent.blur(password());
    expect(password().value).toBe('');

    // 2) confirmPassword InputValue isEmpty
    fireEvent.change(confirmPassword(), { target: { value: '' } });
    fireEvent.blur(confirmPassword());
    expect(confirmPassword().value).toBe('');

    /**
     * 3) password InputValue is matched password-Regex
     * False-Test1) Value : 'Test1234'
     * False-Test2) Value : 'Test12345'
     * False-Test3) Value : 'Test 1234'
     * True-Test) Value : 'Test1234!'
     */
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    fireEvent.change(password(), { target: { value: 'Test1234' } });
    expect(passwordRegex.test(password().value)).toBe(false);

    fireEvent.change(password(), { target: { value: 'Test12345' } });
    expect(passwordRegex.test(password().value)).toBe(false);

    fireEvent.change(password(), { target: { value: 'Test 1234' } });
    expect(passwordRegex.test(password().value)).toBe(false);

    fireEvent.change(password(), { target: { value: 'Test1234!' } });
    expect(passwordRegex.test(password().value)).toBe(true);

    // 4) Check password & confirmPassword InputValue is same
    fireEvent.change(confirmPassword(), { target: { value: 'TestConfirm1234!' } });
    expect(password().value === confirmPassword().value).toBe(false);

    // ADD : Checking AlertModal is making with '회원가입 알림'
    fireEvent.change(confirmPassword(), { target: { value: 'Test1234!' } });
    fireEvent.click(confirmPasswordButton);
    const samePassword = await screen.getByText('비밀번호가 일치합니다!');
    expect(samePassword).toBeInTheDocument();
  });

  /**
   * Checking phoneNumber InputValue has matching phoneNumber Regex.
   */
  it('checking phoneNumber InputValue has matching phoneNumber Regex', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/register']}>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </MemoryRouter>
    );
    const phoneNumber = () => container.querySelector('input[name="phoneNumber"]') as HTMLInputElement;
    const phoneNumberRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;

    // False-Test) value : '전화번호에 문자넣어버리기~'
    fireEvent.change(phoneNumber(), { target: { value: '전화번호에 문자넣어버리기~' } });
    expect(phoneNumberRegex.test(phoneNumber().value)).toBe(false);

    // True-Test) value : '01012345678'
    fireEvent.change(phoneNumber(), { target: { value: '01012345678' } });
    expect(phoneNumberRegex.test(phoneNumber().value)).toBe(true);
  });

  /**
   * Checking CheckBox [Agree Using Service & User Information]
   * Checking isEnabled Regist Complete Button
   */
  it('checking isEnabled Regist Complete Button', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/register']}>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </MemoryRouter>
    );
    const agreeServiceButton = container.querySelector('input[name="agreeService"]') as HTMLInputElement;
    const agreeInformationButton = container.querySelector('input[name="agreeInformation"]') as HTMLInputElement;
    const completeButton = screen.getByRole('button', { name: '회원가입 완료하기' });

    fireEvent.click(agreeServiceButton);
    expect(completeButton).toBeDisabled();

    fireEvent.click(agreeInformationButton);
    expect(completeButton).toBeEnabled();
  });
});

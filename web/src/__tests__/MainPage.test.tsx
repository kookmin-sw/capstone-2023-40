import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import LoginPage from '../routes/LoginPage';
import MainPage from '../routes/MainPage';
import SurveyListPage from '../routes/SurveyPages/SurveyListPage';

describe('[MainPage Test]', () => {
  it('renders MainPage', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <MainPage />
      </MemoryRouter>
    );

    const appTitle = screen.getByText('더 서베이');

    expect(appTitle).toBeInTheDocument();
  });

  /**
   * If Click the '바로 설문하기'Button at MainPage,
   * Checking translated LoginPage location Path.
   */
  it('clicks to navigate to login page if NOT logged in', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MemoryRouter>
    );
    const navigateToSurveyButton = await waitFor(() => screen.getByRole('button', { name: '바로 설문하기' }));
    await act(async () => {
      fireEvent.click(navigateToSurveyButton);
    });

    // FIXME: do not translate location path.
    // expect(window.location.pathname).toBe('/login');
    expect(screen.getByText('이메일')).toHaveTextContent('이메일');
    expect(screen.getByPlaceholderText('이메일을 입력하세요.')).toBeInTheDocument();
  });

  // // FIXME: should be modified to API call
  // it('clicks to navigate to survey page if logged in', async () => {
  //   const setStateMock = jest.fn();
  //   const useStateMock: any = (useState: any) => [useState, setStateMock];
  //   jest.spyOn(React, 'useState').mockImplementation(useStateMock);

  //   render(
  //     <MemoryRouter initialEntries={['/']}>
  //       <Routes>
  //         <Route path="/" element={<MainPage />} />
  //         <Route path="/survey" element={<SurveyListPage />} />
  //       </Routes>
  //     </MemoryRouter>
  //   );

  //   const navigateToSurveyButton = await waitFor(() => screen.getByRole('button', { name: '바로 설문하기' }));
  //   await act(async () => {
  //     fireEvent.click(navigateToSurveyButton);
  //   });

  //   expect(screen.getByText('설문 제목')).toHaveTextContent('설문 제목');
  //   expect(screen.getByText('필수인증')).toHaveTextContent('필수인증');
  //   expect(screen.getByText('설문 종료일')).toHaveTextContent('설문 종료일');

  //   useStateMock.mockRestore();
  // });
});

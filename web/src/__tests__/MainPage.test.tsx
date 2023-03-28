import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

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

  it('clicks to navigate to login page if NOT logged in', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <MainPage />
      </MemoryRouter>
    );

    const navigateToSurveyButton = await waitFor(() => screen.getByRole('button', { name: '바로 설문하기' }));
    await act(async () => {
      fireEvent.click(navigateToSurveyButton);
    });

    expect(container).toHaveTextContent('로그인');
  });

  // FIXME: should be modified to API call
  // it('clicks to navigate to survey page if logged in', async () => {
  //   const setStateMock = jest.fn();
  //   const useStateMock: any = (useState: any) => [useState, setStateMock];
  //   jest.spyOn(React, 'useState').mockImplementation(useStateMock);

  //   const { container } = render(
  //     <MemoryRouter initialEntries={['/']}>
  //       <Routes>
  //         <Route path="/" element={<MainPage />} />
  //       </Routes>
  //     </MemoryRouter>
  //   );

  //   const navigateToSurveyButton = await waitFor(() => screen.getByRole('button', { name: '바로 설문하기' }));
  //   await act(async () => {
  //     fireEvent.click(navigateToSurveyButton);
  //   });

  //   expect(container).toHaveTextContent('설문 제목');
  //   expect(container).toHaveTextContent('필수인증');
  //   expect(container).toHaveTextContent('설문 종료일');

  //   useStateMock.mockRestore();
  // });
});

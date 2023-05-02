import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '../reducers/store';
import LoginPage from '../routes/LoginPage';
import MainPage from '../routes/MainPage';

describe('[MainPage Test]', () => {
  it('renders MainPage', () => {
    render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MemoryRouter initialEntries={['/']}>
            <MainPage />
          </MemoryRouter>
        </PersistGate>
      </Provider>
    );

    const appTitle = screen.getByText('더 서베이');

    expect(appTitle).toBeInTheDocument();
  });

  /**
   * If '바로 설문하기' button is clicked on MainPage without user signing in,
   * it automatically directs to LoginPage.
   */
  it('clicks to navigate to login page if NOT logged in', async () => {
    const { container } = render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </MemoryRouter>
        </PersistGate>
      </Provider>
    );
    const navigateToSurveyButton = await waitFor(() => screen.getByRole('button', { name: '바로 설문하기' }));
    await act(async () => {
      fireEvent.click(navigateToSurveyButton);
    });

    expect(container).toHaveTextContent('로그인');
    expect(screen.getByPlaceholderText('이메일을 입력하세요.')).toBeInTheDocument();
  });

  // // FIXME: should be modified to API call
  // it('clicks to navigate to survey page if logged in', async () => {
  //   const setStateMock = jest.fn();
  //   const useStateMock: any = (useState: any) => [useState, setStateMock];
  //   const isLogin = useSelector((state: RootState) => state.header.isLogin);
  //   const dispatch = useDispatch();
  //   jest.spyOn(React, 'useState').mockImplementation(useStateMock);

  //   render(
  //     <Provider store={store}>
  //       <PersistGate persistor={persistor}>
  //         <MemoryRouter initialEntries={['/']}>
  //           <Routes>
  //             <Route path="/" element={<MainPage />} />
  //             <Route path="/survey" element={<SurveyListPage />} />
  //           </Routes>
  //         </MemoryRouter>
  //       </PersistGate>
  //     </Provider>
  //   );
  //   dispatch(setLogin(!isLogin));
  //   const navigateToSurveyButton = await waitFor(() => screen.getByRole('button', { name: '바로 설문하기' }));

  //   if (isLogin) {
  //     await act(async () => {
  //       fireEvent.click(navigateToSurveyButton);
  //     });
  //   }

  //   expect(screen.getByText('설문 제목')).toHaveTextContent('설문 제목');
  //   expect(screen.getByText('필수인증')).toHaveTextContent('필수인증');
  //   expect(screen.getByText('설문 종료일')).toHaveTextContent('설문 종료일');

  //   useStateMock.mockRestore();
  // });
});

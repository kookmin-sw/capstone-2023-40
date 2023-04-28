import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '../reducers/store';
import SurveyListPage from '../routes/SurveyPages/SurveyListPage';

describe('[SurveyListPage Test]', () => {
  function setUp() {
    return render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MemoryRouter initialEntries={['/survey/']}>
            <Routes>
              <Route path="/survey/" element={<SurveyListPage />} />
            </Routes>
          </MemoryRouter>
        </PersistGate>
      </Provider>
    );
  }

  it('initial rendering SurveyListPage', () => {
    setUp();

    const headTitle = screen.getByText('설문 제목');
    const headAuthList = screen.getByText('필수인증');
    const headEndDate = screen.getByText('설문 종료일');

    expect(headTitle).toBeInTheDocument();
    expect(headAuthList).toBeInTheDocument();
    expect(headEndDate).toBeInTheDocument();
  });

  it('show modal when click survey title', () => {
    setUp();

    const surveyTitles = screen.getAllByRole('button');

    fireEvent.click(surveyTitles[0]);
  });
});

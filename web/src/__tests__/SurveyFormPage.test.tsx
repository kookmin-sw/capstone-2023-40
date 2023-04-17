import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import SurveyFormPage from '../routes/SurveyPages/SurveyFormPage';

describe('[SurveyFormPage Test]', () => {
  // mock scrollIntoView function
  window.HTMLElement.prototype.scrollIntoView = function () {};

  it('renders SurveyFormPage', () => {
    render(
      <MemoryRouter initialEntries={['/survey/form']}>
        <SurveyFormPage />
      </MemoryRouter>
    );

    const pageTitle = screen.getByText('설문조사 작성');

    expect(pageTitle).toBeInTheDocument();
  });

  it('create question when click "+" button', async () => {
    render(
      <MemoryRouter initialEntries={['/survey/form']}>
        <SurveyFormPage />
      </MemoryRouter>
    );

    const addQuestionButton = screen.getByText('+');
    fireEvent.click(addQuestionButton);
    const createdQuestion = await screen.findByTestId('question');

    expect(createdQuestion).toBeInTheDocument();
  });

  it('delete question when click "x" button', async () => {
    render(
      <MemoryRouter initialEntries={['/survey/form']}>
        <SurveyFormPage />
      </MemoryRouter>
    );

    // create question for test delete
    const addQuestionButton = screen.getByText('+');
    fireEvent.click(addQuestionButton);
    const beforeClick = await screen.findByTestId('question');

    expect(beforeClick).toBeInTheDocument();

    const deleteQuestionButton = await screen.findByText('X');
    fireEvent.click(deleteQuestionButton);
    const afterClick = screen.queryByTestId('question');

    expect(afterClick === null);
  });
});

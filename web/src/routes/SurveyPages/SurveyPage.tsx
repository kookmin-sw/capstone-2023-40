import React from 'react';

import { useParams } from 'react-router-dom';

export default function SurveyPage() {
  const { id } = useParams();
  return (
    <div>
      <h1>{`SurveyPage : ${id}`}</h1>
    </div>
  );
}

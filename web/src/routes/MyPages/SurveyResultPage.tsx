import React from 'react';
import { useParams } from 'react-router-dom';

export default function SurveyResultPage() {
  const { id } = useParams();
  return (
    <div>
      <h1>{`SurveyResultPage : ${id}`}</h1>
    </div>
  );
}

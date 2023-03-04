import React from 'react';
import { useParams } from 'react-router-dom';

export default function SurveyResPage() {
  const { id } = useParams();
  return (
    <div>
      <h1>{`SurveyResPage : ${id}`}</h1>
    </div>
  );
}

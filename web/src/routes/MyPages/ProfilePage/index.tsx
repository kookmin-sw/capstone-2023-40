import React from 'react';
import { useParams } from 'react-router-dom';

export default function ProfilePage() {
  const { id } = useParams();
  return (
    <div>
      <h1>{`ProfilePage : ${id}`}</h1>
    </div>
  );
}

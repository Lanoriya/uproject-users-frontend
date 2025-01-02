// src/components/user-configurator/UserConfigurator.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUserStart, addUserSuccess, addUserFailure } from '../../../../redux/features/user/userSlice';

interface UserCreate {
  username: string;
}

export function UserConfigurator() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addUserStart()); // Показать, что запрос начался
    try {
      const response = await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(addUserSuccess(data)); // Добавить пользователя в Redux
        setUsername('');
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Неизвестная ошибка');
        dispatch(addUserFailure(errorData.detail || 'Неизвестная ошибка'));
      }
    } catch (error) {
      setError('Не удалось подключиться к серверу');
      dispatch(addUserFailure('Не удалось подключиться к серверу'));
    }
  };

  return (
    <div>
      <h2>Добавить пользователя</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Добавить</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default UserConfigurator;

// src/components/UserMath.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Интерфейс для пользователя
interface User {
  id: number;
  username: string;
}

export const UserMath = () => {
  const [links, setLinks] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  // Обработчик для отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Разделяем введенные ссылки по новой строке или пробелу
    const linkArray = links.split('\n').map(link => link.trim()).filter(link => link);

    try {
      const res = await fetch('http://localhost:8000/process-links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ links: linkArray }),
      });
      console.log(response)
      const data = await res.json();
      setResponse(data.message);  // Показать результат
    } catch (error) {
      setResponse('Ошибка при обработке данных');
    }
  };

  return (
    <div>
      <h2>Введите ссылки для проверки</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={links}
          className="search-input"
          onChange={(e) => setLinks(e.target.value)}
          rows={10}
          placeholder="Введите ссылки через новую строку"
        />
        <br />
        <button className="search-button" type="submit">Проверить ссылки</button>
      </form>
      
      <div>
        <h3>Результат:</h3>
        <pre>{response}</pre>
      </div>
    </div>
  );
};

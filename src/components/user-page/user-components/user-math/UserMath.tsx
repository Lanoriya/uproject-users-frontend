import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setResult } from '../../../../redux/features/user/userSlice';
import { RootState } from '../../../../redux/store/store';
import { GreenAccountSum } from './GreenAccountSum/GreenAccountSum';

interface GreenAccount {
  link: string;
  state: string;
  price: number;
}

interface ServerResponse {
  message: string;
  total_green_price: number;
  progress: string;
  filtered_results: GreenAccount[];
}

export const UserMath = () => {
  const [linksInput, setLinksInput] = useState<string>('');
  const links = useSelector((state: RootState) => state.user.links);
  const [data, setData] = useState<ServerResponse | null>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (links.length > 0) {
      setLinksInput(links.join('\n'));
    }
  }, [links]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/process-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ links: linksInput.split("\n").map(link => link.trim()) }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      if (reader) {
        let result = "";
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          result += decoder.decode(value, { stream: true });

          const chunks = result.split("\n").filter((chunk) => chunk.trim() !== "");
          for (const chunk of chunks) {
            try {
              const parsed: ServerResponse = JSON.parse(chunk);
              setData(parsed);

              // Обновляем Redux
              dispatch(setResult(parsed));
            } catch {
              // Неполный JSON
            }
          }
          result = ""; // Очистка для следующей части
        }
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const handleCopyLinks = () => {
    if (data && data.filtered_results) {
      // Фильтруем ссылки, исключая "зелёные" (🟢) и удалённые (🗑️)
      const filteredLinks = data.filtered_results
        .filter(result => result.state !== "🟢" && result.state !== "🗑️")
        .map(result => result.link)
        .join("\n");

      // Копируем в буфер обмена
      navigator.clipboard.writeText(filteredLinks).then(() => {
        console.log("Скопировано");
      }).catch(err => {
        console.error("Ошибка копирования ссылок:", err);
      });
    } else {
      alert("Нет ссылок для копирования.");
    }
  };

  return (
    <>
      <div className="usermath-settings">
        <div className="usermath-function">
          <h2>Введите ссылки для проверки</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={linksInput}
              className="search-input"
              onChange={(e) => setLinksInput(e.target.value)}
              rows={10}
              placeholder="Введите ссылки через новую строку"
            />
            <br />
            <button className="search-button" type="submit">Проверить ссылки</button>
          </form>
        </div>
        <div className="usermath-function">
          <h2>Выплата за зеленые аккаунты</h2>
          <GreenAccountSum />
        </div>
        <div className="usermath-function">
          <h2>Холд и не проданные</h2>
          <div>
            <textarea
              value={
                data && data.filtered_results
                  ? data.filtered_results
                      .filter(result => result.state !== "🟢" && result.state !== "🗑️")
                      .map(result => result.link)
                      .join("\n")
                  : ""
              }
              className="search-input"
              rows={10}
              placeholder="Ссылки для копирования"
              readOnly
            />
            <br />
            <button className="search-button" type="button" onClick={handleCopyLinks}>
              Скопировать ссылки
            </button>
          </div>
        </div>
      </div>
      <div className="usemath-result">
        <h3>Результат:</h3>
        {data && data.filtered_results ? (
          data.filtered_results.map((resultItem, index) => (
            <div className="usemath-result-item" key={index}>
              <a href={resultItem.link} target="_blank" rel="noopener noreferrer">
                {resultItem.link}
              </a>
              {" - "}
              <p>{resultItem.state}</p>
              {" - "}
              <p>{resultItem.price}₽</p>
            </div>
          ))
        ) : (
          <p>Нет данных для отображения.</p>
        )}
      </div>
    </>
  );
};

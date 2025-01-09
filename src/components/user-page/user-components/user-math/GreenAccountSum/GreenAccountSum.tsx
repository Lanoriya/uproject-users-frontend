import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store/store';

export const GreenAccountSum: React.FC = () => {
  const data = useSelector((state: RootState) => state.user.serverData);

  if (!data) return null;

  return (
    <div className="green-account-sum">
      <p>Общая сумма: {data.total_green_price} руб</p>
      <p>{data.progress}</p>
      <p>Итоговая сумма: {Math.round(data.total_green_price * 0.8)} руб</p>
    </div>
  );
};

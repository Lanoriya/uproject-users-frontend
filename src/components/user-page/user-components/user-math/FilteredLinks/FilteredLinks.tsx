// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setLinks, setResult } from '../../../../../redux/features/user/userSlice';
// import { RootState } from '../../../../../redux/store/store';

// export const FilteredLinks = () => {
//   const [filteredLinks, setFilteredLinks] = useState<any[]>([]);
//   const result = useSelector((state: RootState) => state.user.result);

//   useEffect(() => {
//     if (result?.filtered_results && Array.isArray(result.filtered_results)) {
//       setFilteredLinks(result.filtered_results);
//     }
//   }, [result]);

//   return (
//     <div className="filtered-links">
//       <h2>Фильтрованные ссылки</h2>
//       {filteredLinks.length === 0 ? (
//         <p>Нет доступных аккаунтов для отображения.</p>
//       ) : (
//         filteredLinks.map((item, index) => (
//           <div key={index}>
//             <p>
//               <a href={item.link} target="_blank" rel="noopener noreferrer">
//                 {item.link}
//               </a>
//               {' - '} {item.state} - Цена: {item.price}
//             </p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

"use client"

import React, { useState, useEffect } from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


interface Props {
  city: string;
  startDate: string;
  endDate: string;
}

interface WeatherData {
  days: {
    datetime: string;
    tempmax: number;
    tempmin: number;
    conditions: string;
  }[];
}

const API_KEY = "JRDJRSXMVGA53A6F494R98CLU";
const API_BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

const WeatherComponent = ({ city, startDate, endDate }: Props) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiUrl = `${API_BASE_URL}/${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setWeatherData(null);
      }
    };

    fetchWeatherData();
  }, [city, startDate, endDate]);

  return (
    <div>
      {weatherData && weatherData.days && weatherData.days.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Дата</TableHead>
              <TableHead>Температура (макс/мин)</TableHead>
              <TableHead>Описание</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {weatherData.days.map(day => (
              <TableRow key={day.datetime}>
                <TableCell>{day.datetime}</TableCell>
                <TableCell>{day.tempmax}°C / {day.tempmin}°C</TableCell>
                <TableCell>{day.conditions}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {!weatherData && <p>Данные о погоде недоступны</p>}
    </div>
  );
  
  // return (
  //   <div>
  //     <h2>Прогноз погоды для {city}</h2>
  //     {weatherData && weatherData.days && weatherData.days.length > 0 && (
  //       <div>
  //         {weatherData.days.map(day => (
  //           <div key={day.datetime}>
  //             <p>Дата: {day.datetime}</p>
  //             <p>Температура: {day.tempmax}°C / {day.tempmin}°C</p>
  //             <p>Описание: {day.conditions}</p>
  //           </div>
  //         ))}
  //       </div>
  //     )}
  //     {!weatherData && <p>Данные о погоде недоступны</p>}
  //   </div>
  // )
}

export default WeatherComponent;

//1
// "use client"
// import React, { useState, useEffect } from 'react';

// interface Props {
//   city: string;
// }

// interface WeatherData {
//   days: {
//     datetime: string;
//     tempmax: number;
//     tempmin: number;
//     conditions: string;
//   }[];
// }

// const API_KEY = "JRDJRSXMVGA53A6F494R98CLU";
// const API_BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

// const WeatherComponent = ({ city }: Props) => {
//   const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       try {
//         const currentDate = new Date().toISOString().slice(0, 10);
//         const futureDate = new Date();
//         futureDate.setDate(futureDate.getDate() + 7);
//         const futureDateString = futureDate.toISOString().slice(0, 10);
//         const apiUrl = `${API_BASE_URL}/${city}/${currentDate}/${futureDateString}?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`;

//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//           throw new Error('Failed to fetch weather data');
//         }
//         const data = await response.json();
//         setWeatherData(data);
//       } catch (error) {
//         console.error('Error fetching weather data:', error);
//         setWeatherData(null); // Установите weatherData в null в случае ошибки
//       }
//     };

//     fetchWeatherData();
//   }, [city]);

//   return (
//     <div>
//       <h2>Прогноз погоды для {city}</h2>
//       {weatherData && weatherData.days && weatherData.days.length > 0 && (
//         <div>
//           {weatherData.days.slice(0, 7).map(day => (
//             <div key={day.datetime}>
//               <p>Дата: {day.datetime}</p>
//               <p>Температура: {day.tempmax}°C / {day.tempmin}°C</p>
//               <p>Описание: {day.conditions}</p>
//             </div>
//           ))}
//         </div>
//       )}
//       {!weatherData && <p>Данные о погоде недоступны</p>}
//     </div>
//   )
// }

// export default WeatherComponent;

//2
// import { useState, useEffect } from 'react';

// interface Props {
//   city: string;
// }

// interface WeatherData {
//   days: {
//     datetime: string;
//     tempmax: number;
//     tempmin: number;
//     conditions: string;
//   }[];
// }

// const WeatherComponent = ({ city }: Props) => {
//   // const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
//   // For 1 Day
//   // const apiKey = "JRDJRSXMVGA53A6F494R98CLU";
//   // const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;

//   //For 7 Days
//   const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
//   const apiKey = "JRDJRSXMVGA53A6F494R98CLU"; // ваш API ключ
//   const currentDate = new Date().toISOString().slice(0, 10); // Текущая дата в формате YYYY-MM-DD
//   const futureDate = new Date();
//   futureDate.setDate(futureDate.getDate() + 7); // Дата через 7 дней
//   const futureDateString = futureDate.toISOString().slice(0, 10); // Дата через 7 дней в формате YYYY-MM-DD
//   const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${currentDate}/${futureDateString}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       try {
//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//           throw new Error('Failed to fetch weather data');
//         }
//         const data = await response.json();
//         setWeatherData(data);
//       } catch (error) {
//         console.error('Error fetching weather data:', error);
//       }
//     };

//     fetchWeatherData();
//   }, [apiUrl]);

//   return (
//     <div>
//       <h2>Прогноз погоды для {city}</h2>
//       {weatherData && (
//         <div>
//           {weatherData.days.slice(0, 7).map(day => (
//             <div key={day.datetime}>
//               <p>Дата: {day.datetime}</p>
//               <p>Температура: {day.tempmax}°C / {day.tempmin}°C</p>
//               <p>Описание: {day.conditions}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default WeatherComponent
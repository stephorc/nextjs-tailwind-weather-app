import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import Weather from '../components/Weather';
import Spinner from '../components/Spinner';

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  // Add your own api key to the .env file before opening project via 'yarn dev'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.get(url).then((response) => {
      setWeather(response.data);
      // console.log(response.data);
    });
    setCity('');
    setLoading(false);
  };

  if (loading) {
    return <Spinner />
  } else {
    return (
      <div>
        <Head>
          <title>Weather - Next App</title>
          <meta name="description" content="Weather app created using NextJs, TailwindCSS, and OpenWeatherMap API." />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[5]'></div>
        <Image
          src='https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
          alt='A lake nestled in the mountains.'
          layout='fill'
          className='object-cover'
        />
        
        <div className='relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10'>
          <form onSubmit={fetchWeather} className='flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl'>
            <div>
              <input
                onChange={(e) => setCity(e.target.value)}
                type='text'
                placeholder='Enter a city'
                className='bg-transparent border-none text-white focus:outline-none text-2xl placeholder:text-white'
              />
            </div>
            <button onClick={fetchWeather}>
              <BsSearch size={20} />
            </button>
          </form>
        </div>

        {weather.main && <Weather data={weather} />}
      </div>
    );
  };
};

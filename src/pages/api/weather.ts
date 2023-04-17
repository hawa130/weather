import { NextApiRequest, NextApiResponse } from 'next';
import { WeatherData } from '@/types/weather';

export async function fetchWeatherData(coordinate?: string) {
  const token = process.env.WEATHER_TOKEN;
  if (!token) {
    throw new Error('TOKEN is not defined');
  }

  const coord = coordinate ?? process.env.DEFAULT_COORD;
  if (!coord) {
    throw new Error('Location coordinate is not defined');
  }

  const url = `https://api.caiyunapp.com/v2.6/${token}/${coord}/weather.json?alert=true&dailysteps=10`;
  const res = await fetch(url);
  return res.json();
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherData>,
) {
  fetchWeatherData(req.query?.coord as string | undefined)
    .then((data) => {
      res.status(200).json(data);
    });
}
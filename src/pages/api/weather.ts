import { NextApiRequest, NextApiResponse } from 'next';
import { WeatherData } from '@/types/weather';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherData>,
) {
  const token = process.env.TOKEN;
  if (!token) {
    throw new Error('TOKEN is not defined');
  }

  const coord = req.query?.coord ?? process.env.DEFAULT_COORD;
  if (!coord) {
    throw new Error('Location coordinate is not defined');
  }

  const url = `https://api.caiyunapp.com/v2.6/${token}/${coord}/weather.json?alert=true`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    });
}
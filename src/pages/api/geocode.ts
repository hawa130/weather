// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { ReGeocodeResult } from '@/types/location';

type BadResponse = {
  status: number;
  message: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReGeocodeResult | BadResponse>,
) {
  const key = process.env.AMAP_WEB_KEY;
  if (!key) {
    throw new Error('AMAP_WEB_KEY is not defined');
  }

  const coord = req.query.coord as string | undefined;
  if (!coord) {
    res.status(400).json({ status: 400, message: 'Coordinate is required' });
    return;
  }

  const url = `https://restapi.amap.com/v3/geocode/regeo?key=${key}&location=${coord}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    });
}

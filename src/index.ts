#!/usr/bin/env node
import * as dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response } from 'express';
import { calculateQueryCountsFromLogFile, getQueryCountsMap } from "./calculateQueryCounts";

if (!process.env.SAMPLE_PATH) {
  throw new Error("require env variable SAMPLE_PATH")
}
calculateQueryCountsFromLogFile(process.env.SAMPLE_PATH!)

const app = express();

app.get('/queries/count/:datePrefix', (req: Request, res: Response) => {
  const { datePrefix } = req.params;
  const queriesSet = getQueryCountsMap().get(datePrefix)
  const count = queriesSet?.size || 0

  res.json({ count });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

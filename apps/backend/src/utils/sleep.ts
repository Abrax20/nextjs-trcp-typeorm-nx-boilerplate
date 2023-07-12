import crypto from 'crypto';
import { promisify } from 'util';

const setTimeoutPromise = promisify(setTimeout);

export const sleep = (msToSleep: number): Promise<void> =>
  setTimeoutPromise(msToSleep);

export const randomSleep = (): Promise<void> =>
  setTimeoutPromise(crypto.randomInt(100, 500));

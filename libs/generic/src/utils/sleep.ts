import crypto from 'crypto';
import { promisify } from 'util';

const setTimeoutPromise = promisify(setTimeout);

export function sleep(msToSleep: number): Promise<void> {
  return setTimeoutPromise(msToSleep);
}

export function randomSleep(): Promise<void> {
  return setTimeoutPromise(crypto.randomInt(100, 500));
}

// global.d.ts
import type { default as Echo } from 'laravel-echo';

declare global {
  interface Window {
    Echo: Echo;
  }
}

import { setupWorker } from 'msw'; // ✅ 올바른 경로
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
import { IOrderStep } from '../models';

export const STEPS: IOrderStep[] = [
  {
    step: 1,
    title: 'Resume',
    current: false,
    completed: false,
  },
  {
    step: 2,
    title: 'Checkout',
    current: false,
    completed: false,
  },
  {
    step: 3,
    title: 'Confirmation',
    current: false,
    completed: false,
  },
];

import {
  trigger,
  state,
  style,
  transition,
  group,
  query,
  animate,
} from '@angular/animations';
import { toLeft, toRight } from './slide.animation';

export const fadeAnimation = trigger('fadeAnimation', [
  state('*', style({ zIndex: 1, opacity: 1 })),
  transition(
    toLeft,
    group([
      query(
        ':leave',
        [
          animate(
            '0.6s ease-in-out',
            style({
              zIndex: 0,
              opacity: 0,
            })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          style({
            zIndex: 1,
            opacity: 1,
          }),
          animate('0.6s ease-in-out', style('*')),
        ],
        { optional: true }
      ),
    ])
  ),
  transition(
    toRight,
    group([
      query(
        ':enter',
        [
          style({
            zIndex: 1,
            opacity: 1,
          }),
          animate('0.6s ease-in-out', style('*')),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          animate(
            '0.6s ease-in-out',
            style({
              zIndex: 0,
              opacity: 0,
            })
          ),
        ],
        { optional: true }
      ),
    ])
  ),
]);

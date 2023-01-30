import {
  trigger,
  state,
  style,
  transition,
  group,
  query,
  animate,
} from '@angular/animations';

export function toLeft(fromState: any, toState: any): boolean {
  return toState.left === true;
}
export function toRight(fromState: any, toState: any): boolean {
  return toState.left === false;
}

export const slideAnimation = trigger('slideAnimation', [
  state(
    '*',
    style({ transform: 'translateX(0)', display: 'block', opacity: 1 })
  ),
  transition(
    toLeft,
    group([
      query(
        ':leave',
        [
          animate(
            '0.6s ease-in-out',
            style({
              transform: 'translateX(-100%)',
            })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          style({
            transform: 'translateX(100%)',
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
            transform: 'translateX(-100%)',
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
              transform: 'translateX(100%)',
            })
          ),
        ],
        { optional: true }
      ),
    ])
  ),
]);

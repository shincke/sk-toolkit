import { h } from '@stencil/core';

/**
 * Icon definitions for sk-icon component
 * Each icon is defined as JSX content while keeping the public API stable.
 */

export type IconName = 'arrow' | 'plus' | 'close' | 'menu' | 'search' | 'chevron' | 'check' | 'external' | 'moon' | 'sun' | 'mail' | 'github' | 'instagram';

export type ChevronDirection = 'down' | 'up' | 'left' | 'right';

interface IconDefinition {
  viewBox: string;
  render: (dir?: ChevronDirection) => any;
}

const icons: Record<IconName, IconDefinition> = {
  arrow: {
    viewBox: '0 0 16 16',
    render: () => [h('line', { x1: '2', y1: '8', x2: '14', y2: '8' }), h('polyline', { points: '9,3 14,8 9,13' })],
  },
  plus: {
    viewBox: '0 0 16 16',
    render: () => [h('line', { x1: '8', y1: '2', x2: '8', y2: '14' }), h('line', { x1: '2', y1: '8', x2: '14', y2: '8' })],
  },
  close: {
    viewBox: '0 0 16 16',
    render: () => [h('line', { x1: '3', y1: '3', x2: '13', y2: '13' }), h('line', { x1: '13', y1: '3', x2: '3', y2: '13' })],
  },
  menu: {
    viewBox: '0 0 16 16',
    render: () => [h('line', { x1: '2', y1: '4', x2: '14', y2: '4' }), h('line', { x1: '2', y1: '8', x2: '14', y2: '8' }), h('line', { x1: '2', y1: '12', x2: '14', y2: '12' })],
  },
  search: {
    viewBox: '0 0 16 16',
    render: () => [h('circle', { cx: '7', cy: '7', r: '4.5' }), h('line', { x1: '10.5', y1: '10.5', x2: '14', y2: '14' })],
  },
  chevron: {
    viewBox: '0 0 16 16',
    render: (dir: ChevronDirection = 'down') => {
      const rotations: Record<ChevronDirection, number> = { down: 0, up: 180, left: 90, right: -90 };
      const rotate = rotations[dir];
      return h('g', { style: { transform: `rotate(${rotate}deg)`, transformOrigin: 'center' } }, [h('polyline', { points: '3,6 8,11 13,6' })]);
    },
  },
  check: {
    viewBox: '0 0 16 16',
    render: () => h('polyline', { points: '2,8 6,12 14,4' }),
  },
  external: {
    viewBox: '0 0 16 16',
    render: () => [
      h('polyline', { points: '9,2 14,2 14,7' }),
      h('line', { x1: '14', y1: '2', x2: '7', y2: '9' }),
      h('path', { d: 'M6 4H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-3' }),
    ],
  },
  moon: {
    viewBox: '0 0 16 16',
    render: () => h('path', { d: 'M13 9.5A6 6 0 1 1 6.5 3a4 4 0 0 0 6.5 6.5z' }),
  },
  sun: {
    viewBox: '0 0 16 16',
    render: () => [
      h('circle', { cx: '8', cy: '8', r: '3' }),
      h('line', { x1: '8', y1: '1', x2: '8', y2: '3' }),
      h('line', { x1: '8', y1: '13', x2: '8', y2: '15' }),
      h('line', { x1: '1', y1: '8', x2: '3', y2: '8' }),
      h('line', { x1: '13', y1: '8', x2: '15', y2: '8' }),
      h('line', { x1: '3.05', y1: '3.05', x2: '4.46', y2: '4.46' }),
      h('line', { x1: '11.54', y1: '11.54', x2: '12.95', y2: '12.95' }),
      h('line', { x1: '3.05', y1: '12.95', x2: '4.46', y2: '11.54' }),
      h('line', { x1: '11.54', y1: '4.46', x2: '12.95', y2: '3.05' }),
    ],
  },
  mail: {
    viewBox: '0 0 16 16',
    render: () => [h('rect', { x: '1', y: '3', width: '14', height: '10', rx: '1' }), h('polyline', { points: '1,4 8,9 15,4' })],
  },
  github: {
    viewBox: '0 0 16 16',
    render: () => [
      h('path', { d: 'M6 12c0 1 .5 2 2 2s2-1 2-2' }),
      h('path', { d: 'M8 2C4.5 2 2 4.5 2 7.5c0 1.5.6 2.8 1.5 3.7C3.2 12 3 12.8 3 14h10c0-1.2-.2-2-.5-2.8C13.4 10.3 14 9 14 7.5 14 4.5 11.5 2 8 2z' }),
    ],
  },
  instagram: {
    viewBox: '0 0 16 16',
    render: () => [
      h('rect', { x: '2', y: '2', width: '12', height: '12', rx: '3' }),
      h('circle', { cx: '8', cy: '8', r: '3' }),
      h('circle', { cx: '11.5', cy: '4.5', r: '0.5', fill: 'currentColor' }),
    ],
  },
};

/**
 * Get an icon definition by name
 * @param name - The name of the icon
 * @returns The icon definition or null if not found
 */
export function getIcon(name: IconName, dir?: ChevronDirection): IconDefinition | null {
  const icon = icons[name];
  void dir;
  return icon || null;
}

/**
 * Get all available icon names
 */
export function getIconNames(): IconName[] {
  return Object.keys(icons) as IconName[];
}

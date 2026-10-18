import { Controls, Description, Primary, Title } from '@storybook/blocks';
import { createElement, Fragment } from 'react';

export const storyPage = (...sections: string[]) => `<div class="story-page">${sections.join('')}</div>`;

export const storySection = (title: string, body: string) => `
  <section class="story-section">
    <sk-caption>${title}</sk-caption>
    ${body}
  </section>
`;

export const storyRow = (...items: string[]) => `<div class="story-row">${items.join('')}</div>`;

export const storyStack = (...items: string[]) => `<div class="story-stack">${items.join('')}</div>`;

export const storyGrid = (columns: 2 | 3 | 4, ...items: string[]) => `<div class="story-grid cols-${columns}">${items.join('')}</div>`;

export const storyPanel = (body: string) => `<div class="story-panel">${body}</div>`;

export const storyStage = (body: string, className = '') => {
  const classes = ['story-stage', className].filter(Boolean).join(' ');

  return `<div class="${classes}">${body}</div>`;
};

export const docsPageTemplate = () => {
  return createElement(
    Fragment,
    null,
    createElement(Title),
    createElement(Description),
    createElement(Primary),
    createElement(Controls),
  );
};

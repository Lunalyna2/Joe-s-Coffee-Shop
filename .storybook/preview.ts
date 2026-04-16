import type { Preview } from '@storybook/nextjs-vite';
// @ts-ignore - This silences the TS2882 error while allowing styles to load
import '../app/globals.css'; 

export const parameters = {
  nextjs: {
    appDirectory: true,
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo'
    }
  },
};

export default preview;
/* eslint-disable import/no-extraneous-dependencies */

/**
 * Workaround for https://github.com/facebook/jest/issues/7780
 */

import JSDOMEnvironment from 'jest-environment-jsdom';

class CustomJSDOMEnvironment extends JSDOMEnvironment {
  constructor(config) {
    super(
      {
        ...config,
        globals: {
          ...config.globals,
          Uint32Array,
          Uint8Array,
          ArrayBuffer,
        },
      },
    );
  }
}

export default CustomJSDOMEnvironment;

import adapter from '@sveltejs/adapter-static';
import autoprefixer from 'autoprefixer';
import preprocess from 'svelte-preprocess';

const prod = process.env.NODE_ENV === 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    postcss: {
      plugins: [autoprefixer]
    }
  }),

  kit: {
    adapter: adapter(),
    serviceWorker: {
      register: false
    },
    prerender: {
      default: true
    },
    ...(prod && {
      csp: {
        directives: {
          'default-src': ['none'],
          'img-src': [
            'self',
            'data:',
            'blob:',
            'https://cdn.papy.rs',
            'https://media.tenor.com/',
            'https://images.unsplash.com/',
            'https://*.raw.ic0.app'
          ],
          'manifest-src': ['self'],
          'style-src': ['self', 'unsafe-inline', 'https://cdn.papy.rs'],
          'font-src': ['self'],
          'script-src': ['self', 'unsafe-eval', 'https://cdn.papy.rs/'],
          'connect-src': [
            'https://ic0.app',
            'https://*.raw.ic0.app',
            'https://us-central1-unsplash-proxy.cloudfunctions.net/',
            'https://api.tenor.com/',
            'https://images.unsplash.com/',
            'https://raw.githubusercontent.com/papyrs/',
            'https://app.papy.rs/_app/version.json'
          ],
          'upgrade-insecure-requests': true,
          'child-src': ['self', 'blob:', 'data:']
        }
      }
    })
  }
};

export default config;

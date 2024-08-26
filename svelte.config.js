import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: 'public', // 出力ディレクトリを 'public' に設定
      assets: 'public',
      fallback: undefined,
      precompress: false,
      strict: true,
    }),
  },
};

export default config;

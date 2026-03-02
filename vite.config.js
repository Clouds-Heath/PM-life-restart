/** @type {import('vite').UserConfig} */
const basePath = process.env.VITE_BASE_PATH || '/';

export default {
  base: basePath,
  server: {
    open: true,
  },
  build: {
    outDir: 'dist',
  },
  plugins: [
    {
      name: 'update-base-href',
      transformIndexHtml(html) {
        let result = html.replace(
          /<base href="[^"]*"/,
          `<base href="${basePath}"`
        );
        
        // For GitHub Pages deployment, also update script src paths to be absolute
        if (basePath !== '/') {
          result = result.replace(
            /src="(libs\/[^"]+)"/g,
            `src="${basePath}$1"`
          );
        }
        
        return result;
      },
    },
  ],
}

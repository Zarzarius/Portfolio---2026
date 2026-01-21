export default {
  server: {
    // preset: 'static',
    preset: 'vercel',
    prerender: {
      routes: [
        '/',
        '/about',
        '/contact',
        '/logs',
        '/projects',
        '/signal',
        '/stack',
      ],
      crawlLinks: true,
    },
  },
};

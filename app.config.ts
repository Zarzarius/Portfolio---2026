export default {
  server: {
    // preset: 'static',
    preset: 'node-server',
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

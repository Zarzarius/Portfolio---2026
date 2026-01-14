export default {
  server: {
    preset: 'static',
    prerender: {
      routes: ['/', '/about', '/contact', '/logs', '/projects', '/signal', '/stack'],
      crawlLinks: true,
    },
  },
};

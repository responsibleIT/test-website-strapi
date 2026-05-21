export default {
  routes: [
    {
      method: 'POST',
      path: '/rebuild',
      handler: 'api::rebuild.rebuild.trigger',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
  ],
};
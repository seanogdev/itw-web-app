module.exports = {
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        prependData: '@import "@/styles/variables.scss";',
      },
    },
  },
  devServer: {
    proxy: {
      '/graphql': {
        target: 'http://localhost:8000',
        ws: true,
      },
      '/wp-admin': {
        target: 'http://localhost:8000',
        ws: true,
      },
      '/wp-login.php': {
        target: 'http://localhost:8000',
        ws: true,
      },
    },
  },
  chainWebpack: (config) => {
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.graphql$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end();

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        // eslint-disable-next-line no-param-reassign
        options.transpileOptions = {
          transforms: {
            dangerousTaggedTemplateString: true,
          },
        };
        return options;
      });
  },
};

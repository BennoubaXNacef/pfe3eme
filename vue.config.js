const path = require("path");

module.exports = {
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },

  chainWebpack: (config) => {
    config.resolve.alias.set("@", path.resolve(__dirname, "src"));

    config.plugin("define").tap((args) => {
      args[0].__VUE_PROD_DEVTOOLS__ = "false";
      args[0].__VUE_PROD_MISMATCH__ = "false";
      return args;
    });
  },
};

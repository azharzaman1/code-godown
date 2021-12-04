const removeImports = require("next-remove-imports")();

module.exports = {
  images: {
    domains: ["tailwindui.com"],
  },
};

module.exports = removeImports({
  experimental: { esmExternals: true },
});

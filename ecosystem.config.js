module.exports = {
  apps: [
    {
      name: "Sample Server",
      script: "./dist/app.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
      instances: 0,
      exec_mode: "cluster",
    },
  ],
};

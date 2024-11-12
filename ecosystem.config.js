module.exports = {
  apps: [
    {
      name: "education-client",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: "1",
      exec_mode: "cluster",
      watch: false, // Disable watching in production
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};

/* 
 module.exports = {
    apps: [
      {
        name: 'Education',
        script: 'node_modules/next/dist/bin/next',
        args: 'start -p 3000',
        instances: '1',
        exec_mode: 'cluster',
        watch: false,  // Disable watching for production
        env: {
          NODE_ENV: 'development', //pm2 start ecosystem.config.js --env development
        },
        env_production: {
          NODE_ENV: 'production', //pm2 start ecosystem.config.js --env production
        },
      },
    ],
  };
  
  */

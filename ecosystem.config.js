module.exports = {
  apps: [
    {
      name: "ip-bazaar",
      script: "npx",
      args: "serve -s dist -l 3000",
      cwd: "./",
      env: {
        NODE_ENV: "production"
      },
      instances: 1,
      exec_mode: "fork",
      watch: false,
      max_memory_restart: "1G",
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true
    }
  ]
};
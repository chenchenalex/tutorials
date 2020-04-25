// instruction
/* 
1. start the server with node cluster.js
2. server logs the master pid, get read with command kill -SIGUSR2 {pid}
3. start monitoring the server by using ab -c200 -t10 http://localhost:8080/
4. kill the process on step 2, server will restart itself one by one
5. observe the result in the benchmark, see if any request is failed
6. and give a try to process manager like PM2 https://github.com/Unitech/pm2
*/

const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  const cpus = os.cpus().length;

  console.log(`Forking for ${cpus} CPUs`);
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`worker ${worker.id} is crashed, starting a new worker...`);
      cluster.fork();
    }
  });

  console.log(`Master PID: ${process.pid}`);

  // restart workers on mannual
  process.on("SIGUSR2", () => {
    const workers = Object.values(cluster.workers);

    const restartWorkers = (index) => {
      const worker = workers[index];
      if (!worker) return;

      worker.on("exit", () => {
        if (!worker.exitedAfterDisconnect) return;
        console.log(`Exited process ${worker.process.pid}`);

        cluster.fork().on("listening", () => {
          console.log(`worker ${index} restarted`);
          restartWorkers(index + 1);
        });
      });
      worker.disconnect();
    };

    restartWorkers(0);
  });
} else {
  console.log(`Started process ${process.pid}`);
  require("./server");
}

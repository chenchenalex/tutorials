const cluster = require("cluster");
const os = require("os");

// Mock DB calls
const numberOfUsersInDB = function () {
  this.count = this.count || 5;
  this.count *= this.count;
  return this.count;
};

if (cluster.isMaster) {
  const cpus = os.cpus().length;

  console.log(`Forking for ${cpus} CPUs`);
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
  console.dir(cluster.workers, { depth: 0 });

  const updateWorkers = () => {
    const count = numberOfUsersInDB();
    Object.values(cluster.workers).forEach((worker) => {
      worker.send(`Hello Worker ${count}`);
    });
  };

  updateWorkers();
  setInterval(updateWorkers, 10000);
} else {
  require("./server");
}

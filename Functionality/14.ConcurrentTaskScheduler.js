// Implement a Task Scheduler with concurrency control

// ***********************************************************************

class ConcurrentTaskScheduler {
    constructor(concurrency) {
        this.concurrency = Number(concurrency);
        this.runningTasks = 0;
        this.__waitingQueue = [];
    }

    getNextTask() {
        if (this.runningTasks < this.concurrency && this.__waitingQueue.length > 0) {
            const nextTask = this.__waitingQueue.shift();
            nextTask();
        }
    }

    addTask(task) {
        return new Promise((resolve, reject) => {

            async function __taskRunner() {
                this.runningTasks += 1;
                try {
                    const result = await task();
                    console.log("Result : ", result);
                    resolve(result);
                } catch (err) {
                    console.log(`Task failed`, err);
                    reject(err);
                } finally {
                    this.runningTasks -= 1;
                    // Check bandwidth and execute task if available
                    this.getNextTask();
                }
            }

            if (this.runningTasks < this.concurrency) {
                __taskRunner.call(this);
            } else {
                this.__waitingQueue.push(__taskRunner.bind(this));
            }
        });
    }
}

// ***********************************************************************

const scheduler = new ConcurrentTaskScheduler(2);

scheduler.addTask(() => new Promise((res) => setTimeout(() => res('Task 1'), 1000)));
scheduler.addTask(() => new Promise((res) => setTimeout(() => res('Task 2'), 1000)));
scheduler.addTask(() => new Promise((res) => setTimeout(() => res('Task 3'), 1000)));
scheduler.addTask(() => new Promise((res) => setTimeout(() => res('Task 4'), 1000)));
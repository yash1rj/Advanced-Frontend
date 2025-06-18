// Implement a Task Scheduler with concurrency control

// ***********************************************************************

class ConcurrentTaskScheduler {
    constructor(concurrency, options = {}) {
        this.concurrency = Number(concurrency);
        this.runningTasks = 0;
        this.__waitingQueue = [];
        this.taskIdCounter = 0;
        this.completedTasks = 0;
        this.failedTasks = 0;

        // Options
        this.enableLogging = options.enableLogging || false;

        // Event callbacks
        this.onTaskStart = options.onTaskStart || null;
        this.onTaskComplete = options.onTaskComplete || null;
        this.onTaskError = options.onTaskError || null;
    }

    getNextTask() {
        if (this.runningTasks < this.concurrency && this.__waitingQueue.length > 0) {
            const nextTaskWrapper = this.__waitingQueue.shift();
            nextTaskWrapper.execute();
        }
    }

    addTask(task, options = {}) {
        const taskId = ++this.taskIdCounter;
        const priority = options.priority || 0;
        return new Promise((resolve, reject) => {

            const taskWrapper = {
                id: taskId,
                priority,
                createdAt: Date.now(),
                execute: async () => {
                    this.runningTasks += 1;
                    const startTime = Date.now();

                    // Notify task start
                    if (this.onTaskStart) {
                        this.onTaskStart({ taskId, startTime });
                    }

                    if (this.enableLogging) {
                        console.log(`🚀 Starting task ${taskId}`);
                    }

                    try {
                        const result = await task();

                        const duration = Date.now() - startTime;
                        this.completedTasks++;

                        if (this.enableLogging) {
                            console.log(`✅ Task ${taskId} completed in ${duration}ms:`, result);
                        }

                        // Notify task completion
                        if (this.onTaskComplete) {
                            this.onTaskComplete({ taskId, result, duration });
                        }

                        console.log("Result : ", result);
                        resolve(result);
                    } catch (err) {
                        const duration = Date.now() - startTime;
                        this.failedTasks++;

                        if (this.enableLogging) {
                            console.log(`❌ Task ${taskId} failed after ${duration}ms:`, err.message);
                        }

                        // Notify task error
                        if (this.onTaskError) {
                            this.onTaskError({ taskId, error: err, duration });
                        }

                        console.log(`Task failed`, err);
                        reject(err);
                    } finally {
                        this.runningTasks -= 1;
                        // Check bandwidth and execute task if available
                        this.getNextTask();
                    }
                }
            };

            if (this.runningTasks < this.concurrency) {
                taskWrapper.execute();
            } else {
                // Insert based on priority (higher priority first)
                this.insertByPriority(taskWrapper);
            }
        });
    }

    // Insert task by priority
    insertByPriority(taskWrapper) {
        const insertIndex = this.__waitingQueue.findIndex(
            t => t.priority < taskWrapper.priority
        );

        if (insertIndex === -1) {
            this.__waitingQueue.push(taskWrapper);
        } else {
            this.__waitingQueue.splice(insertIndex, 0, taskWrapper);
        }
    }

    // Get scheduler statistics
    getStats() {
        return {
            concurrency: this.concurrency,
            runningTasks: this.runningTasks,
            queuedTasks: this.__waitingQueue.length,
            completedTasks: this.completedTasks,
            failedTasks: this.failedTasks,
            totalProcessed: this.completedTasks + this.failedTasks
        };
    }
}

// ***********************************************************************

const scheduler = new ConcurrentTaskScheduler(2, {
    enableLogging: true,
    onTaskStart: ({ taskId }) => console.log(`📋 Task ${taskId} queued for execution`),
    onTaskComplete: ({ taskId, duration }) => console.log(`📊 Task ${taskId} metrics: ${duration}ms`),
    onTaskError: ({ taskId, error }) => console.log(`🚨 Task ${taskId} error logged: ${error.message}`)
});

const enhancedTasks = [
    scheduler.addTask(() => new Promise((res) => setTimeout(() => res('Task 1'), 1000)), { priority: 1 }),
    scheduler.addTask(() => new Promise((res) => setTimeout(() => res('Task 2'), 1000)), { priority: 5 }),
    scheduler.addTask(() => new Promise((res) => setTimeout(() => res('Task 3'), 1000)), { priority: 4 }),
    scheduler.addTask(() => new Promise((res) => setTimeout(() => res('Task 4'), 1000)), { priority: 1 })
];

try {
    const results = await Promise.allSettled(enhancedTasks);
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(`  Task ${index + 1}: ✅ ${result.value}`);
        } else {
            console.log(`  Task ${index + 1}: ❌ ${result.reason.message}`);
        }
    });

    console.log("\nFinal Statistics:", scheduler.getStats());

} catch (error) {
    console.error("Scheduler demo error:", error);
}
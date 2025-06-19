import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

// Create a test queue
const queue = kue.createQueue();

describe('createPushNotificationsJobs', () => {
  before(() => {
    // Enter test mode
    kue.Job.rangeByType('push_notification_code_3', 'active', 0, -1, 'asc', () => {});
    queue.testMode.enter();
  });

  afterEach(() => {
    // Clear all jobs after each test
    queue.testMode.clear();
  });

  after(() => {
    // Exit test mode after all tests
    queue.testMode.exit();
  });

  it('should throw an error if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs('not-an-array', queue)).to.throw('Jobs is not an array');
  });

  it('should create jobs in the queue', () => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 4562 to verify your account'
      }
    ];

    createPushNotificationsJobs(jobs, queue);
    expect(queue.testMode.jobs.length).to.equal(2);

    // Check the content of the first job
    const job = queue.testMode.jobs[0];
    expect(job.type).to.equal('push_notification_code_3');
    expect(job.data).to.deep.equal(jobs[0]);
  });
});

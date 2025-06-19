// 6-job_creator.js
import kue from 'kue';

const queue = kue.createQueue();

const jobData = {
  phoneNumber: '1234567890',
  message: 'This is a test notification message',
};

const job = queue.create('push_notification_code', jobData);

job
  .save((err) => {
    if (!err) {
      console.log(`Notification job created: ${job.id}`);
    }
  })
  .on('complete', () => {
    console.log('Notification job completed');
  })
  .on('failed', () => {
    console.log('Notification job failed');
  });

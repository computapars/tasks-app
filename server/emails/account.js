const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const welcomeEmail = (email, name) => {
    const msg = {
        to: email,
        from: 'marlenebowles@gmail.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: `Welcome to the app ${name} and easy to do anywhere.`,
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);
}

const inviteToHouseEmail = (email, name, inviter, house) => {
    const msg = {
        to: email,
        from: 'marlenebowles@gmail.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: `${inviter} has invited you to join ${house} at Tasking.dev`,
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);
}

const reminderEmail = (email, name, taskName, dueDate) => {
    const msg = {
        to: email,
        from: 'marlenebowles@gmail.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: `${name} has invited you to join ${taskName} at Tasking.dev ${dueDate}`,
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);
}

module.exports = {
    inviteToHouseEmail,
    welcomeEmail,
    reminderEmail,
}
const sgMail = require('@sendgrid/mail');
const PORT = process.env.PORT;
const url = `${process.env.DOMAIN}${PORT ? ':': ''}${PORT ? PORT: ''}`;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const welcomeEmail = (email, name) => {
    const msg = {
        to: email,
        from: 'welcome@yourturn.dev',
        subject: `${name}, welcome to yourturn.dev`,
        text: `Welcome to the app YourTurn.dev, an easy place to share tasks with friends and family.`,
        html: `<strong>Welcome</strong><br>Login to your new profile at yourturn.dev</br>
        to get started adding tasks and getting stuff done.`,
    };
    sgMail.send(msg);
}

const inviteToHouseEmail = ({ referral, email, name, message, houseName, houseId}) => {
    const msg = {
        to: email,
        from: 'invite@yourturn.dev',
        subject: `${referral} has invited you to join ${houseName} at YourTurn.dev`,
        text: `${referral} has invited you to join ${houseName} at YourTurn.dev`,
        html: `Hello ${name}, <br>${message}</br>
        <a href="http://${url}/house/members/invite/?houseId=${houseId}&houseName${houseName}&userName=${name}">
        Create Your Profile</a> now and start getting stuff done!
        `,
    };
    sgMail.send(msg);
}



module.exports = {
    inviteToHouseEmail,
    welcomeEmail,
}
import {Injectable} from '@hapiness/core';
import {Config} from '@hapiness/config';

@Injectable()
export class MailsService {
    // To store transporter nodemailer
    private transporter: any;

    constructor() {
        let nodemailer = require('nodemailer');
        this.transporter = nodemailer.createTransport(Config.get('mail'));
    }

    testEmail() {
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Easy Gift" <' + Config.get('mail.auth.user') + '>', // sender address
            to: 'simonhajek88@gmail.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        };

        // send mail with defined transport object
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    }


}

const nodemailer = require('nodemailer');

module.exports = {
    send: (req, res ) => {
        const { formname, formemail, formphone, formmessage } = req.body;
        const output = `
        <div style = 'margin: 0px; height: 750px; width: 450px; background: #444444';>
    
            <img style = 'height: 180px; margin-left: 140px; margin-top: 30px;' src='https://www.iconsdb.com/icons/preview/white/hammer-xxl.png' alt="avatar"/>
            <h3 style = 'color: #fdd947; font-size: 50px; margin-left: 65px;'>Tool Share</h3>
            <p style = 'color: white; font-size: 25px;'>You have a new contact request: </p>
            <h3 style = 'color: white; font-size: 25px;'>Contact Details</h3>
            <ul>
                <li style = 'color: white; font-size: 30px;'>Name: ${formname}</li>
                <li style = 'color: white; font-size: 30px;'>Email: ${formemail}</li>
                <li style = 'color: white; font-size: 30px;'>Phone Number: ${formphone}</li>
            </ul>
            <h3 style = 'color: white; font-size: 25px;'>Message: ${formmessage}</h3>
        </div>
        `;

         // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        name: 'mail.michaeljamiephoto.com',
        host: 'mail.michaeljamiephoto.com',
        port: 26,
        secure: false,
        debug: true,
         // true for 465, false for other ports
        auth: {
            user: 'doodleninja@michaeljamiephoto.com', // generated ethereal user
            pass: 'Hannah1234!' // generated ethereal password
        },
        tls:{
            rejectUnauthorized: false
        }
        
            
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'doodleninja@michaeljamiephoto.com', // sender address
        to: 'reallygoodtools@gmail.com', // list of receivers
        subject: 'Tool Share Contact Request', // Subject line
        text: 'New Message!', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(info)
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        
    });

    }
}
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

// Middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files and set the view engine
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// Create a route to render the contact form
app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/', (req, res) => {
    res.render('home');
});

// Create a route to handle form submissions
app.post('/send', (req, res) => {
    const { name, email, address, phone, inquiry } = req.body;

    // Create a nodemailer transporter (set up your email provider's details)
    const transporter = nodemailer.createTransport({
        service: 'Outlook',
        auth: {
            user: 'pgs22056_mca.maneesh@cbit.org.in',
            pass: 'MCA@5641'
        }
    });

    // Email details
    const mailOptions = {
        from: 'pgs22056_mca.maneesh@cbit.org.in',
        to: 'psushma0000@gmail.com',
        subject: `Contact form submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nAddress: ${address}\nPhone: ${phone}\nInquiry: ${inquiry}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Email could not be sent.' });
        } else {
            console.log('Email sent: ' + info.response);
            const emailInfo = {
                success: true,
                message: 'Email sent successfully',
                email: {
                    from: mailOptions.from,
                    to: mailOptions.to,
                    subject: mailOptions.subject,
                    text: mailOptions.text
                }
            };
            res.status(200).json("mail sent, u can go back");
        }
    });
});

// Start the server
const port = process.env.PORT || 7000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

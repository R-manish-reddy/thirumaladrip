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
// Create a route to handle form submissions
// Create a route to handle form submissions
app.post('/send', (req, res) => {
    const { name, email, message } = req.body;

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
        to: 'manishreddygari@gmail.com',
        subject: `Contact form submission from ${name}`,
        text: message
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.redirect('/contact?error=1');
        } else {
            console.log('Email sent: ' + info.response);
            res.redirect('/contact?success=1');
        }
    });
});



// Start the server
const port = process.env.PORT || 7000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

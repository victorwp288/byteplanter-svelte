import nodemailer from 'nodemailer';
import { GOOGLE_EMAIL, GOOGLE_PASSWORD } from '$env/static/private';

export const POST = async ({ request }) => {
	// Extract all fields from the form submission
	const { firstName, lastName, phoneNumber, subject, email, message } = await request.json();

	// Configure your SMTP server details
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		auth: {
			user: GOOGLE_EMAIL,
			pass: GOOGLE_PASSWORD
		}
	});

	// Define email options
	const mailOptions = {
		from: '"Form Submission" victorwpetersen@gmail.com',
		to: email,
		subject: `New Message from ${firstName} ${lastName} - ${subject}`,
		text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nSubject: ${subject}\nMessage: ${message}`
	};

	// Send the email
	try {
		await transporter.sendMail(mailOptions);
		return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'There was an error sending the email' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
};

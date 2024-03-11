// // with Resend email service

// import { Resend } from 'resend'

// const resend = new Resend(process.env.RESEND_API_KEY)
// const domain = process.env.NEXT_PUBLIC_APP_URL

// export const sendVerificationEmail = async (email: string, token: string) => {
//     const confirmLink = `${domain}/auth/new-verification?token=${token}`

//     await resend.emails.send({
//         from: 'onboarding@resend.dev',
//         to: email,
//         subject: "Confirm your email",
//         html: `<p>Click<a href="${confirmLink}"> here</a> to confirm email!</p>`
//     })
// }

// export const sendPasswordResetEmail = async (email: string, token: string) => {
//     const resetLink = `${domain}/auth/new-password?token=${token}`

//     await resend.emails.send({
//         from: 'onboarding@resend.dev',
//         to: email,
//         subject: "Reset your password",
//         html: `<p>Click<a href="${resetLink}"> here</a> to reset your password!</p>`
//     })
// }

// export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
//     await resend.emails.send({
//         from: 'onboarding@resend.dev',
//         to: email,
//         subject: "2FA code",
//         html: `<p>your 2FA code: ${token}</p>`
//     })
// }

// with nodemailer

import nodemailer from 'nodemailer'

const domain = process.env.NEXT_PUBLIC_APP_URL
const nodemailerUser = process.env.NODEMAILER_USER
const nodemailerPassword = process.env.NODEMAILER_PASSWORD

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: nodemailerUser,
        pass: nodemailerPassword,
    },
});

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;

    // Define email content
    const mailOptions = {
        from: nodemailerUser,
        to: email,
        subject: 'Confirm your email',
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email!</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully!');
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    // Define email content
    const mailOptions = {
        from: nodemailerUser,
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password!</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully!');
    } catch (error) {
        console.error('Error sending password reset email:', error);
    }
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {

    // Define email content
    const mailOptions = {
        from: nodemailerUser,
        to: email,
        subject: "2FA code",
        html: `<p>Your 2FA code: ${token}</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('2FA code sent successfully!');
    } catch (error) {
        console.error('Error sending 2FA code:', error);
    }
};
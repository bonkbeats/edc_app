const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/auth');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');

// Generate a reset token, save it in the database, and send an email
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequestError('Please provide an email');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError('No user found with this email');
  }

  // Generate a random reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
  console.log('Generated reset token:', resetToken);


  // Set token and expiration time
  user.resetPasswordToken = resetTokenHash;
  user.resetPasswordExpire = Date.now() + 20 * 60 * 1000; // 10 minutes
  await user.save();

  const message = `You have requested a password reset. Please use the following token to reset your password: ${resetToken}`;

  try {
    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    

    // Send the email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Request',
      text: message,
    });

    res.status(StatusCodes.OK).json({
      message: 'Password reset token has been sent to your email. It will expire in 10 minutes.',
    });
  } catch (error) {
    // In case of error, clear the token and expiration time
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Email could not be sent. Please try again later.',
    });
    
  }
};

module.exports = {
  forgotPassword,
};

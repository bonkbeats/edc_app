const crypto = require('crypto');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const User = require('../models/auth');
const bcrypt = require('bcryptjs');  // Make sure to import bcrypt

// Verify token and reset the password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    throw new BadRequestError('Please provide a new password');
  }

  console.log('Received token:', token);
  console.log('Received password:', password);

  // Hash the token to compare with the stored token
  const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');
  console.log('Generated reset token hash:', resetTokenHash);

  try {
    // Find user by token and check if token is not expired
    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpire: { $gt: Date.now() }, // Ensure the token is not expired
    });

    console.log('User found:', user);

    if (!user) {
      throw new BadRequestError('Invalid or expired reset token');
    }

    // Check if the new password is the same as the old one (optional but recommended)
    const isSamePassword = await user.comparePassword(password);
    console.log('Password comparison result:', isSamePassword);

    if (isSamePassword) {
      throw new BadRequestError('New password cannot be the same as the old password');
    }

      // Assign the new password to the user
      user.password = password; // This triggers the `pre('save')` middleware to hash the password


    // Hash the new password before saving
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(password, salt); // Ensure password is hashed before saving
    // console.log('New hashed password:', user.password);

    // Clear the token fields as the password has been reset
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    console.log('User password updated successfully');

    res.status(StatusCodes.OK).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while resetting the password. Please try again later.',
    });
  }
};

module.exports = {
  resetPassword,
};

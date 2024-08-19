// Imports:
import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { promisify } from 'util';

// Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is a required field.'],
      minLength: [4, 'Name must be 4 characters or longer.'],
      maxLength: [40, 'Name cant be more than 40 characters long.'],
      validate: {
        validator: (val) =>
          validator.isAlphanumeric(val, ['en-US'], { ignore: ' ' }),
        message: 'Name may only contain characters.',
      },
    },
    userName: {
      type: String,
      trim: true,
      unique: [true, 'This user name is already taken.'],
      required: [true, 'User name is a required field.'],
      minLength: [4, 'User name must be 4 characters or longer.'],
      maxLength: [40, 'User name cant be more than 40 characters long.'],
      validate: {
        validator: (val) =>
          validator.isAlphanumeric(val, ['en-US'], { ignore: '.-_' }),
        message: 'User name may only contain characters.',
      },
    },
    email: {
      type: String,
      trim: true,
      unique: [true, 'A user with this email address already exist.'],
      lowercase: true,
      required: [true, 'Email is a required field.'],
      validate: {
        validator: (val) => validator.isEmail(val),
        message: 'Please provide a valid email address.',
      },
    },
    password: {
      type: String,
      select: false,
      minLength: [8, 'Password must contain at least 8  characters or longer.'],
      maxLength: [40, 'Password connot contain more than 40  characters.'],
      required: [true, 'Password is a required field.'],
    },
    passwordConfirm: {
      type: String,
      select: false,
      minLength: [8, 'Password must contain at least 8  characters or longer.'],
      maxLength: [40, 'Password connot contain more than 40  characters.'],
      required: [true, 'Password confirm is a required field.'],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Password don't match",
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual fields:
userSchema.virtual('tasks', {
  ref: 'Task',
  foreignField: 'user',
  localField: '_id',
});
userSchema.pre(/^findOne/, function (next) {
  this.populate('tasks');
  next();
});

// Middleware:
userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.passwordConfirm = '';
    this.password = await promisify(bcrypt.hash)(
      this.password,
      await bcrypt.genSalt(10)
    );
  }
  next();
});

// Methods:
userSchema.methods.isPasswordCorrect = function (pass, hash) {
  return bcrypt.compare(pass, hash);
};

// Export
const User = mongoose.model('User', userSchema);
export default User;

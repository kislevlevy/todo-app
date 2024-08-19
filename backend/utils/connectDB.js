// Imports:
import mongoose from 'mongoose';

// Database connect:
//prettier-ignore
export default async function () {
  try {
    const url = process.env.DB_LINK
    .replace("<PASS>", process.env.DB_PASS)
    .replace("<USER>", process.env.DB_USER);

    await mongoose.connect(url);
  } catch (err) {
    throw err;
  }
}

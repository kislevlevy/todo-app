// Imports:
import dotenv from 'dotenv';
import connectDB from './utils/connectDB.js';

dotenv.config({ path: 'config.env' });
import app from './app.js';

// App listen:
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`The server is running!\nhttp://${process.env.BACK_END}`);
});

connectDB()
  .then(() => console.log('DB connection was successful!'))
  .catch((err) => console.log('📵', err));

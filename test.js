const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const footer = await mongoose.connection.db.collection('footers').findOne();
  console.log(footer.bottomBlocks);
  process.exit();
}).catch(console.error);

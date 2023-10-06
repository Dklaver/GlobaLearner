const express = require("express");
const app = express();

const userRoute = require('./routes/User')
const chatRoute = require('./routes/Chat')

app.use('/users', userRoute);
app.use('/chat', chatRoute);

app.listen(5000, () => {
    console.log(`Server is listening to 5000`);
})

'use strict';
import express from 'express';
import cors from "cors";
import accountRoutes from './routes/accountRoutes';
//import emailRoutes from './routes/emailRoutes';

const app = express();
app.use(
    cors({
        origin: '*'
    })
);

app.use(express.json({limit: '5mb'}));


app.use(express.json()); // Parse JSON bodies (as sent by API clients)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening to ${PORT}`));
app.disable('etag');//to guarantee that res.statusCode = 200, unless there is an error

app.use(accountRoutes);
//app.use(emailRoutes);



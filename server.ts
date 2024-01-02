import express, { json, Request, Response } from 'express';
import morgan from 'morgan';
const app = express();

app.use(json());

// Middleware which allows us to see what requests are being recived
app.use(morgan('dev'));

// Used to create and provide information to the views folder
app.set("view engine", "ejs");

app.get("/", (req: Request, res: Response) => {
    console.log('Home Page');
    res.render("index");
});



// This tells the server to listen for requests, it is listening on port 3000, and logs that when listening
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


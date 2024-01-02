import express, { json, Request, Response } from 'express';
import morgan from 'morgan';
const app = express();

app.use(json());
app.use(express.urlencoded({ extended: true }));

// Middleware which allows us to see what requests are being recived
app.use(morgan('dev'));

// Used to create and provide information to the views folder
app.set("view engine", "ejs");


import { register } from './stage1';
app.get("/", (req: Request, res: Response) => {
    console.log('Home Page');
    res.render("index");
});

app.post("/register", (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    const response = register(email, password);
    return res.json(response);
});



// This tells the server to listen for requests, it is listening on port 3000, and logs that when listening
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


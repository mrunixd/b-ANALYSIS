if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

import express, { json, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { register, hashPassword, storeInfo } from './stage1';

const app = express();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

app.use(json());
app.use(express.urlencoded({ extended: false }));

const initialisePassport = require('./passport-config');
initialisePassport(passport);

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// Middleware which allows us to see what requests are being recived
app.use(morgan('dev'));

// Used to create and provide information to the views folder
app.set("view engine", "ejs");


app.get("/", checkAuthenticated, (req: Request, res: Response) => {
    console.log('Home Page');
    res.render("index.ejs");
});

app.get("/register", checkNotAuthenticated, (req: Request, res: Response) => {
    res.render("register.ejs");
});

app.post("/register", checkNotAuthenticated, (req: Request, res: Response) => {
    const email = req.body.email;
    const password = hashPassword(req.body.password);

    const response = register(email, password);
    return res.redirect('/login');
});

app.get("/login", checkNotAuthenticated, (req: Request, res: Response) => {
    res.render("login.ejs");
});

app.post("/login", checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.delete('/logout', (req: Request, res: Response) => {
    (req as any).logOut(() => {
        res.redirect('/login');
    });
});

function checkAuthenticated(req: Request, res: Response, next: NextFunction) {
    if ((req as any).isAuthenticated()) {
        return next();
    }

    return res.redirect('/login');
}

function checkNotAuthenticated(req: Request, res: Response, next: NextFunction) {
    if ((req as any).isAuthenticated()) {
        return res.redirect('/');
    }

    next();
}

// This tells the server to listen for requests, it is listening on port 3000, and logs that when listening
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.post("/", checkAuthenticated, (req: Request, res: Response) => {
    const {
        authUserId,
        salary,
        rent,
        vehicle,
        food,
        memberships,
        insurance,
        debt
    } = req.body;
   
    console.log('inputs received');
    const response = storeInfo(authUserId, salary, rent, vehicle, food, 
        memberships, insurance, debt);
    return res.redirect('/results');
});

app.get("/results", (req: Request, res: Response) => {
    res.render("results.ejs");
});
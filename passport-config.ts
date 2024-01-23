import { getData } from "./dataStore";
import { PassportStatic } from 'passport';
import { User } from "./dataStore";
import { hashPassword } from "./stage1";

const LocalStrategy = require('passport-local').Strategy;

function initialise(passport: PassportStatic) {
    
    const authenticateUser = (email: string , password: string, done: (error: any, user?: User, options?: { message?: string }) => void) => {
        const data = getData();
        const user = data.users.find(user => user.email === email);

        if (!user) {
            return done(null, undefined, { message: 'No user with that email' });
        }

        if (user.password !== hashPassword(password)) {
            return done(null, undefined, { message: 'Password Incorrect!' });
        }
        return done(null, user);
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, 
    authenticateUser));
   
    passport.serializeUser((user: User , done) => {
        done(null, user.authUserId);
    });

    passport.deserializeUser((id: number, done) => {
        const data = getData();
        const foundUser = data.users.find(user => user.authUserId === id);
        if (foundUser) {
            done(null, foundUser);
        } else {
            done(new Error('User not found'));
        }
    });
}

module.exports = initialise;
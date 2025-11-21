import {rateLimit} from 'express-rate-limit';

const LogInLimiter = rateLimit({
    windowMs: 60*1000,
    limit:1000,
    handler: (req, res, next)=> {
        const error = new Error ('Too many login requests');
        error.status = 429;
        next(error);
    },
});

export default LogInLimiter;
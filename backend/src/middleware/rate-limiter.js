const rateLimiter = require('express-rate-limit');

const authLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50,
    message: {
        status: 429,
        message: 'Too many requests, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = authLimiter; 


// [NOTE]:=> Now each IP can only make 50 requests in 15 minutes.
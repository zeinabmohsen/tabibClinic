const rateLimit = require('express-rate-limit')

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  skipSuccessfulRequests: true,
  keyGenerator: function(req) {
    return req.headers['x-forwarded-for']
  },
})

module.exports = {
  authLimiter,
}

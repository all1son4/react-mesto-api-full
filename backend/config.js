const { JWT_SECRET = 'jwtsecret' } = process.env;

const urlPattern = /^((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i;

module.exports = { JWT_SECRET, urlPattern };

module.exports = function(role) {
    return function(req, res, next) {
    if (req.user.esAdmin !== role) {
        return res.status(403).json({ msg: 'Access denied' });
    }
    next();
    };
};
const memberMiddleware = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    if (req.session.user.role === "member" || "admin") {
        next();
    } else {
        return res.status(403).render('403.ejs');
    }
}

module.exports = memberMiddleware;
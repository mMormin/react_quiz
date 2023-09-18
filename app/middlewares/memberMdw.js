const memberMiddleware = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  if (req.session.user.role === "member" || "admin") {
    next();
  } else {
    return res.status(403).render("status", { statuts: "403" });
  }
};

module.exports = memberMiddleware;

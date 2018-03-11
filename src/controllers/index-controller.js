const indexController = (req, res, next) => {
  res.render('index', {
    title: 'SXP Team 78 Project'
  });
}

module.exports = indexController;

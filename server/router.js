module.exports = app => {
  app.get('/', (req, res, next) => {
    res.send(['1', '2', '3']);
  });
}
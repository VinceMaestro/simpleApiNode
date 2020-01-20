module.exports = function(app, db) {
  app.post('/notes', (req, res) => {
    console.log(req.params)
    console.log(req.body)
    console.log(req.query)
    res.send('Hello')
  });
};

import express from 'express';
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/v1', (req, res) => {
  res.json({
    message: 'hello world!',
  });
});

app.listen(port);

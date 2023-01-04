const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', function(req, res) {
    console.log('root route');
    return res.send('Statistical Operations (mean, median, mode)');
  });

app.get('/mean', (req, res) => {
    let total = 0;
    let length;
    let nums;
    if (req.query.nums) {
        nums = req.query.nums.split(',');
        length = req.query.nums.length;

        for (let num of nums) {
            num = num * 1;
            total += num;
        }
    }
    const mean = total / length;
    return res.send(`MEAN = ${mean}`);
});

app.listen(3000, function() {
console.log('Server started on port 3000.');
});
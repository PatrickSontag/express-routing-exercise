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

app.get('/median', (req, res) => {
    if (req.query.nums) {
        // comma separated "nums" to array of "nums" 
        let nums = req.query.nums.split(',');
        // string nums to number nums
        nums = nums.map(n => n * 1);
        // sort array
        nums = nums.sort((a,b) => a-b);
        
        const length = nums.length;
        const middle = Math.floor(length/2);
        const median = nums[middle];
        return res.send(`MEDIAN = ${median}`);
        }
});

app.get('/mode', (req, res) => {
    if (req.query.nums) {
        // comma separated "nums" to array of "nums" 
        let nums = req.query.nums.split(',');
        // string nums to number nums
        nums = nums.map(n => n * 1);
        // count occurrences of each number
        let nCount = {};
        for (let num of nums) {
            if (nCount[num]) nCount[num] ++;
            else nCount[num] = 1;
        }
        console.log("nCount: ", nCount);

        const mode = Object.keys(nCount).reduce((a, b) => nCount[a] > nCount[b] ? a : b);
        const result = { operation: "mode", value: mode };
        return res.json(result);
        }
});

app.listen(3000, function() {
console.log('Server started on port 3000.');
});
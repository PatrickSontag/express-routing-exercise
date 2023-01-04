const express = require('express');
const MyError = require('./myError');

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
        length = nums.length;

        for (let num of nums) {
            num = num * 1;
            total += num;
        }
        const mean = total / length;
        console.log("length: ", length);
        const result = { operation: "mean", value: mean };

        return res.json(result);
    }
    throw new MyError("NO INPUT GIVEN", 403);
    return res.send("MEAN");
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
        const result = { operation: "median", value: median };

        return res.json(result);
    }
    throw new MyError("NO INPUT GIVEN", 403);
    return res.send("MEDIAN");
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
        const mode = Object.keys(nCount).reduce((a, b) => nCount[a] > nCount[b] ? a : b);
        const result = { operation: "mode", value: mode };
        return res.json(result);
    }
    throw new MyError("NO INPUT GIVEN", 403);
    return res.send("MODE");
});

app.listen(3000, function() {
console.log('Server started on port 3000.');
});
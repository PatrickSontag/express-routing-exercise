const express = require('express');
const MyError = require('./myError');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log("SERVER GOT A REQUEST");
    next();
})

const isNumber = (a) => a * 1; 

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
    throw new MyError("NO INPUT GIVEN", 400);
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
    throw new MyError("NO INPUT GIVEN", 400);
    return res.send("MEDIAN");
});

app.get('/mode', (req, res, next) => {
    if (req.query.nums) {
        // comma separated "nums" to array of "nums" 
        let nums = req.query.nums.split(',');
        // string nums to number nums
        nums = nums.map(n => {
            if (n * 1) {
                return n * 1;
            }
            else {
                throw new MyError(`${n} is not a number!`, 400)
            }
        });
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
    throw new MyError("NO INPUT GIVEN", 400);
});

app.use((error, req, res, next) => {
    res.send("IT'S AN ERROR");
})

app.listen(3000, function() {
console.log('Server started on port 3000.');
});
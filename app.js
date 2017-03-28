let express = require("express");
let app = express();

let employeesRepo = require('./employees.js');

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/api/employees', function (req, res) {
    res.json(employeesRepo.employees);
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Employee management api is running');
});
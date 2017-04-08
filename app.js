let express = require("express");
let bodyParser = require('body-parser');
let app = express();
let employeesRepo = require('./employees.js');
const uuidV1 = require('uuid/v1');

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/api/employees', function (req, res) {
    res.json(employeesRepo.employees);
});

app.post("/api/employees", function (req, res) {
    let employee = req.body;
    employee.id = uuidV1();
    employeesRepo.employees.push(employee);
    res.json(employee);
});

app.put("/api/employees/:id", function (req, res) {
    let employee = req.body;
    let id = req.params.id;
    let foundEmployee = employeesRepo.employees.find(e => e.id === id);
    if (foundEmployee) {
      Object.assign(foundEmployee, employee);
      res.json(employee);
    } else {
      res.send(400);
    }
});

app.delete("/api/employees/:id", function (req, res) {
  let id = req.params.id;
  let employeeIndex = employeesRepo.employees.findIndex(e => e.id === id);
  if (employeeIndex >= 0) {
    employeesRepo.employees.splice(employeeIndex, 1);
    res.send(200);
  } else {
    res.send(400);
  }
});

app.listen(process.env.PORT || 3000, function () {
    console.log(`Employee management api is running on port ${process.env.PORT || 3000}`);
});

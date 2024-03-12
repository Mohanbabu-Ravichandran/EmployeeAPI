const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// In-memory storage for employees (replace this with a database in a real-world scenario)
let employees = [];
let nextEmployeeId = 1;

// API endpoint to update employee data
app.post('/employees', (req, res) => {
  const { firstName, lastName, job } = req.body;

  // Generate a unique ID for the new employee
  const id = nextEmployeeId++;

  // Create new employee
  const newEmployee = { id, firstName, lastName, job };
  employees.push(newEmployee);

  // Send a success response with the generated ID and additional fields
  res.status(200).json({ id, ...req.body });
});

// API endpoint to get all employees (for UI access)
app.get('/employees', (req, res) => {
  res.header('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify({ employees }, null, 2));
});

// API endpoint to get a specific employee by ID
app.get('/employees/:id', (req, res) => {
  const employeeId = parseInt(req.params.id, 10);

  // Find the employee with the specified ID
  const employee = employees.find((emp) => emp.id === employeeId);

  if (employee) {
    res.status(200).json(employee);
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
});

// Route for the root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Employee API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is UP and running on http://localhost:${PORT}`);
});

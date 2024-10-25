const API_URL = "http://localhost:5000/api"; // Adjust to your API URL

// Task API
export const fetchTasks = async () => {
  const response = await fetch(`${API_URL}/tasks`);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return await response.json();
};

export const AddTasks = async (task) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error("Failed to add task");
  }
};

export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
  return await response.json();
};

export const fetchTaskById = async (id) => {
  const response = await fetch(`${API_URL}/tasks/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch task by ID");
  }
  return await response.json();
};

export const updateTask = async (id, taskData) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) {
    throw new Error("Failed to update task");
  }
  return await response.json();
};

// Customer API
export const fetchCustomers = async () => {
  const response = await fetch(`${API_URL}/customers`);
  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }
  return await response.json();
};

// Fetch Customer by ID
export const fetchCustomersbyid = async (id) => {
  const response = await fetch(`${API_URL}/customers/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch Customer");
  }
  return await response.json();
};

// Add customer
export const AddCustomers = async (customerdata) => {
  const response = await fetch(`${API_URL}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerdata),
  });
  if (!response.ok) {
    throw new Error("Failed to add customer");
  }
};

// Update customer
export const UpdateCustomers = async (id, customerdata) => {
  const response = await fetch(`${API_URL}/customers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerdata),
  });
  if (!response.ok) {
    throw new Error("Failed to update customer");
  }
};

// Delete customer
export const deleteCustomer = async (id) => {
  const response = await fetch(`${API_URL}/customers/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete customer");
  }
  return await response.json();
};

// Insurance API
// Fetch all insurance
export const fetchinsurance = async () => {
  const response = await fetch(`${API_URL}/insurances`);
  if (!response.ok) {
    throw new Error("Failed to fetch insurances");
  }
  return await response.json();
};

// Fetch insurance by ID
export const fetchinsurancebyid = async (id) => {
  const response = await fetch(`${API_URL}/insurances/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch insurance");
  }
  return await response.json();
};

// Add Insurance 
export const AddInsurance = async (insurancedata) => {
  const response = await fetch(`${API_URL}/insurances`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(insurancedata),
  });
  if (!response.ok) {
    throw new Error("Failed to create Insurance");
  }
  return await response.json();
};

// Update Insurance
export const UpdateInsurance = async (id, insurancedata) => {
  const response = await fetch(`${API_URL}/insurances/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(insurancedata),
  });
  if (!response.ok) {
    throw new Error("Failed to update Insurance");
  }
  return await response.json();
};

// Employee API
// Fetch all employees
export const fetchEmployees = async () => {
  const response = await fetch(`${API_URL}/employees`);
  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }
  return await response.json();
};

// Fetch employee by ID
export const fetchEmployeeById = async (id) => {
  const response = await fetch(`${API_URL}/employees/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch employee");
  }
  return await response.json();
};

// Create new employee
export const addEmployee = async (employeeData) => {
  const response = await fetch(`${API_URL}/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  });
  if (!response.ok) {
    throw new Error("Failed to create employee");
  }
  return await response.json();
};

// Update employee
export const updateEmployee = async (id, employeeData) => {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  });
  if (!response.ok) {
    throw new Error("Failed to update employee");
  }
  return await response.json();
};

// Delete employee
export const deleteEmployee = async (id) => {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }
  return await response.json();
};

// FollowUps API
// Get FollowUps
export const fetchAutomated = async () => {
  const response = await fetch(`${API_URL}/followups`);
  if (!response.ok) {
    throw new Error("Failed to fetch follow-ups");
  }
  return await response.json();
};

// Create FollowUps
export const createFollowup = async (followupdata) => {
  const response = await fetch(`${API_URL}/followups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(followupdata),
  });
  if (!response.ok) {
    throw new Error("Failed to create FollowUps");
  }
  return await response.json();
};

// Update FollowUps
export const updateFollowup = async (id, followupdata) => {
  const response = await fetch(`${API_URL}/followups/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(followupdata),
  });
  if (!response.ok) {
    throw new Error("Failed to update FollowUps");
  }
  return await response.json();
};

// Delete FollowUps
export const deleteFollowups = async (id) => {
  const response = await fetch(`${API_URL}/followups/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete Follow Ups");
  }
  return await response.json();
};

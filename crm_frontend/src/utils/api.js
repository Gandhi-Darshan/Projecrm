const API_URL = "http://localhost:5000/api"; // Adjust to your API URL

//Task API
export const fetchTasks = async () => {
  const response = await fetch(`${API_URL}/tasks`);
  return await response.json();
};

export const AddTasks = async (task) => {
  await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
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
  return await response.json();
};

// Customer API
export const fetchCustomers = async () => {
  const response = await fetch(`${API_URL}/customers`);
  return await response.json();
};


//Employee API
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


//  followUps Api
//Get Followups
export const fetchAutomated = async () => {
  const response = await fetch(`${API_URL}/followups`);
  if (!response.ok) {
    throw new Error("Failed to fetch follow-ups");
  }
  return await response.json();
};
//create FollowUps
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
//update FollowUps
export const updateFollowup = async (id, followupdata) => {
  const response = await fetch(`${API_URL}/followups/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(followupdata),
  });
  if (!response.ok) {
    throw new Error("Failed to update employee");
  }
  return await response.json();
};
//Delete FollowUps

export const deleteFollowups = async (id) => {
  const response = await fetch(`${API_URL}/followups/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete Follow Ups");
  }
  return await response.json();
};


// Similar functions for fetchCustomers, createCustomer, updateCustomer, deleteCustomer, etc.

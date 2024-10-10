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
export const fetchEmployees = async () => {
  const response = await fetch(`${API_URL}/employees`);
  return await response.json();
};
// Similar functions for fetchCustomers, createCustomer, updateCustomer, deleteCustomer, etc.

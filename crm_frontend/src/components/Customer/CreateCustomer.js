import React, { useState, useEffect } from "react";
import { AddCustomers, AddInsurance, fetchCustomersbyid, UpdateCustomers, UpdateInsurance } from "../../utils/api"; // Ensure correct import
import "./css/CreateCustomer.css"; // Include your CSS file
import { useLocation, useNavigate } from "react-router-dom";

const CreateCustomer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editId = new URLSearchParams(location.search).get("edit");

  // State for customer
  const [customerName, setCustomerName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [emailSubscribed, setEmailSubscribed] = useState(false);

  // State for insurance
  const [provider, setProvider] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [coverageDetails, setCoverageDetails] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  useEffect(() => {
    if (editId) {
      const fetchCustomerData = async () => {
        try {
          const customerData = await fetchCustomersbyid(editId); // Fetch customer data with populated insurance
          if (customerData) {
            setCustomerName(customerData.name || "");
            setAge(customerData.age || "");
            setGender(customerData.gender || "");
            setEmail(customerData.email || "");
            setMedicalHistory(customerData.medical_history || "");
            setContactDetails(customerData.contact_details || "");
            setEmailSubscribed(customerData.email_subscribed || false);
            console.log(customerData)
            // Check if insurance details are populated
            if (customerData.insurance_details) {
              setProvider(customerData.insurance_details.provider || "");
              setPolicyNumber(customerData.insurance_details.policyNumber || "");
              setCoverageDetails(customerData.insurance_details.coverageDetails || "");
              setExpiryDate(customerData.insurance_details.expiryDate || "");
            } else {
              // Reset insurance fields if no insurance details found
              setProvider("");
              setPolicyNumber("");
              setCoverageDetails("");
              setExpiryDate("");
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchCustomerData();
    }
  }, [editId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const insuranceData = {
      provider,
      policyNumber,
      coverageDetails,
      expiryDate,
    };
  
    try {
      if (editId) {
        // Fetch existing customer data to get insurance ID
        const customerData = await fetchCustomersbyid(editId);
        console.log(customerData);
  
        // Check if insurance_details exists
        let existingInsuranceId = null;
        if (customerData.insurance_details) {
          existingInsuranceId = customerData.insurance_details._id; // Get existing insurance ID
        }
  
        if (existingInsuranceId) {
          // Update the insurance details
          await UpdateInsurance(existingInsuranceId, insuranceData); // Use the method for updating insurance
  
          // Prepare customer data for update
          const updatedCustomerData = {
            name: customerName,
            age,
            gender,
            email,
            medical_history: medicalHistory,
            contact_details: contactDetails,
            email_subscribed: emailSubscribed,
            insurance_details: existingInsuranceId, // Keep the same insurance ID
          };
  
          // Update the customer with the new data
          await UpdateCustomers(editId, updatedCustomerData); // Use the method for updating customer
          alert("Customer and Insurance updated successfully!");
        } else {
          // If no existing insurance ID, create a new insurance
          const insurance = await AddInsurance(insuranceData); // Use the method for creating insurance
  
          // Prepare customer data for creation
          const newCustomerData = {
            name: customerName,
            age,
            gender,
            email,
            medical_history: medicalHistory,
            contact_details: contactDetails,
            insurance_details: insurance._id, // Add new insurance ID
            email_subscribed: emailSubscribed,
          };
  
          // Update the customer with the new insurance
          await UpdateCustomers(editId, newCustomerData); // Use the method for updating customer
          alert("Customer updated successfully with new Insurance!");
          navigate('/customers');
        }
      } else {
        // Create new insurance first and get the insurance ID
        const insurance = await AddInsurance(insuranceData); 
        // Use the method for creating insurance
  
        // Prepare customer data for creation
        const newCustomerData = {
          name: customerName,
          age,
          gender,
          email,
          medical_history: medicalHistory,
          contact_details: contactDetails,
          insurance_details: insurance._id, // Add new insurance ID
          email_subscribed: emailSubscribed,
        };
  
        // Create the new customer
        await AddCustomers(newCustomerData); // Use the method for creating customer
        alert("Customer and Insurance created successfully!");
        navigate('/customers');
      }
    } catch (error) {
      console.error("Error creating/updating customer and insurance:", error);
      alert("Failed to create/update customer and insurance.");
      navigate('/customers');
    }
  
    // Reset form fields
    setCustomerName("");
    setAge("");
    setGender("");
    setEmail("");
    setMedicalHistory("");
    setContactDetails("");
    setEmailSubscribed(false);
    setProvider("");
    setPolicyNumber("");
    setCoverageDetails("");
    setExpiryDate("");
  };
  

  return (
    <div className="create-customer-container">
      <h3>{editId ? "Edit Customer & Insurance" : "Create Customer & Insurance"}</h3>
      <form onSubmit={handleSubmit} className="customer-form">
        {/* Customer Section */}
        <h4>Customer Information</h4>
        <div className="form-row">
          <label className="form-label">
            Name:
            <input
              type="text"
              className="form-input"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </label>
          <label className="form-label">
            Age:
            <input
              type="number"
              className="form-input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-row">
          <label className="form-label">
            Gender:
            <select
              className="form-input"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label className="form-label">
            Email:
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-row">
          <label className="form-label">
            Medical History:
            <textarea
              className="form-input"
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              rows="3"
            />
          </label>
          <label className="form-label">
            Contact Details:
            <input
              type="text"
              className="form-input"
              value={contactDetails}
              onChange={(e) => setContactDetails(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-row checkbox-row">
          <label className="form-checkbox">
            <input
              type="checkbox"
              checked={emailSubscribed}
              onChange={(e) => setEmailSubscribed(e.target.checked)}
            />
            Email Subscribed
          </label>
        </div>

        {/* Insurance Section */}
        <h4>Insurance Information</h4>
        <div className="form-row">
          <label className="form-label">
            Provider:
            <input
              type="text"
              className="form-input"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              required
            />
          </label>
          <label className="form-label">
            Policy Number:
            <input
              type="text"
              className="form-input"
              value={policyNumber}
              onChange={(e) => setPolicyNumber(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-row">
          <label className="form-label">
            Coverage Details:
            <input
              type="text"
              className="form-input"
              value={coverageDetails}
              onChange={(e) => setCoverageDetails(e.target.value)}
              required
            />
          </label>
          <label className="form-label">
            Expiry Date:
            <input
              type="date"
              className="form-input"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </label>
        </div>

        <button type="submit">{editId ? "Update Customer" : "Create Customer"}</button>
      </form>
    </div>
  );
};

export default CreateCustomer;

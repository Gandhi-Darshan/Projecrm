import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCustomersbyid } from "../../utils/api"; // Adjust based on your API functions
import "./css/CustomerDetails.css"; // Import the CSS file for styles

const CustomerDetail = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const getCustomer = async () => {
      const customerData = await fetchCustomersbyid(customerId); // Assuming this fetches customer by ID
      setCustomer(customerData);
    };
    getCustomer();
  }, [customerId]);

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="customer-detail-container">
      <h2>Customer Details</h2>
      <div className="customer-detail-card">
        <div className="customer-details">
          <h3>Customer Information</h3>
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Age:</strong> {customer.age}</p>
          <p><strong>Gender:</strong> {customer.gender}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Subscribed:</strong> {customer.email_subscribed ? "Yes" : "No"}</p>
          <p><strong>Contact:</strong> {customer.contact_details}</p>
        </div>

        <div className="separator"></div> {/* Vertical separator */}

        <div className="medical-history">
          <h3>Medical History</h3>
          <p>{customer.medical_history || "No medical history available."}</p>
        </div>

        <div className="separator"></div> {/* Vertical separator */}

        <div className="insurance-info">
          <h3>Insurance Information</h3>
          <p><strong>Provider:</strong> {customer.insurance_details?.provider || "N/A"}</p>
          <p><strong>Policy Number:</strong> {customer.insurance_details?.policyNumber || "N/A"}</p>
          <p><strong>Coverage Details:</strong> {customer.insurance_details?.coverageDetails || "N/A"}</p>
          <p><strong>Expiry Date:</strong> {customer.insurance_details?.expiryDate || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;

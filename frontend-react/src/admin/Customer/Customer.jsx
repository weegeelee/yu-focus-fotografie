import { useState, useEffect } from "react";
import CustomerTable from "./CustomerTable.jsx";
import CustomerSide from "./CustomerSide.jsx"
import axios from "axios";
import "./customer.css"

export default function Customer() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("🔍 Token before API request:", token);
    if (!token) {
      console.error("No token found, redirecting to login...");
      return; 
    }
    axios.get("http://localhost:3000/customers", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch data", error);
      });
  }, []);

  const handleConfirmDelete = async (userId) => {
    if (!userId) {
      console.error("Error: selectedUserId is null or undefined!");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, redirecting to login...");
      return; 
    }
    try {
      await axios.delete(`http://localhost:3000/customers/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedCustomers = customers.filter(customer => customer._id !== userId);
      setCustomers(updatedCustomers); 
    } catch (error) {
      console.error(error);
      alert("Failed to delete user");
    }
  };

  return (
    <main className="customer-box">
      <CustomerSide customers={customers} />
      <CustomerTable customers={customers} onDelete={handleConfirmDelete} />
    </main>
  );
};

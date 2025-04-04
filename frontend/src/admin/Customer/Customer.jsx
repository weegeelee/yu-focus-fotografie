import { useState, useEffect } from "react";
import CustomerTable from "./CustomerTable.jsx";
import CustomerSide from "./CustomerSide.jsx"
import api from "../../../api.js";
import "./customer.css"

export default function Customer() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
      const response = await api.get("/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      };
    };
    fetchCustomers();
  }, []);

  const handleConfirmDelete = async (userId) => {
    if (!userId) {
      console.error("Error: selectedUserId is null or undefined!");
      return;
    }
    try {
      await api.delete(`/customers/${userId}`);
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

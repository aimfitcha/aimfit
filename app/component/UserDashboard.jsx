"use client"
import React, { useEffect,useState } from 'react'
import UserListing from './UserListing'

function UserDashboard() {

    const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Fetch data from an external API
        const fetchData = async () => {
          try {
            const response = await fetch("/api/listing");
            const data = await response.json();
            setUsers(data.list);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);

      if (loading) return <p>Loading...</p>;
  return (
    <UserListing users={users}></UserListing>
  )
}

export default UserDashboard
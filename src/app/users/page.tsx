"use client";
import { useEffect, useState } from "react";
import Logo from "../_components/Logo";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const gettingUsers = async () => {
      try {
        const response = await axios.get("/api/admin/users");
        setUsers(response.data); // Use response.data to access the actual data
      } catch (error) {
        console.log("Error loading data: ", error);
      }
    };
    gettingUsers();
  }, []);

  return (
    <div className="text-center font-poppins">
      <Logo />
      <div>All the users</div>
      {users.length !== 0 ? (
        users.map((user) => (
          <div
            key={user._id}
            className="bg-white m-3 rounded-md border-2 border-chocolate text-left p-2"
          >
            <div>
              <strong>Username:</strong> {user.username}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Status:</strong> {user.status}
            </div>
            <div>
              <strong>Created On:</strong> {user.createdOn}
            </div>
          </div>
        ))
      ) : (
        <div>No user present</div>
      )}
    </div>
  );
}

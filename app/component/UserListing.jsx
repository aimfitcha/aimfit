import React from "react";

// Utility function to parse DD/MM/YYYY into a Date object
const parseDate = (dateString) => {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day); // Month is 0-indexed
};

function UserListing({ users, onEdit }) {
  const getPresentDate = () => new Date();

  const isDue = (joiningDate) => {
    const joining = new Date(joiningDate);
    const dueDate = new Date(joining);
    dueDate.setDate(joining.getDate() + 30); // Add 30 days to the joining date
    return dueDate > getPresentDate();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
            <th className="border border-gray-300 px-4 py-2">Mobile</th>
            <th className="border border-gray-300 px-4 py-2">Joining Date</th>
            <th className="border border-gray-300 px-4 py-2">Due Date</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.address}</td>
                <td className="border border-gray-300 px-4 py-2">{user.mobile}</td>
                <td className="border border-gray-300 px-4 py-2">{user.joining_date}</td>
                <td
                  className={`border border-gray-300 px-4 py-2 ${
                    isDue(user.joining_date) ? "bg-green-400 text-white" : "bg-red-400 text-white"
                  }`}
                >
                  {isDue(user.joining_date) ? "On Time" : "Overdue"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <span
                    className={`inline-block px-2 py-1 rounded text-white ${
                      user.status ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {user.status ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => onEdit(user)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserListing;

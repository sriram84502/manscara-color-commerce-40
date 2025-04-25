
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User } from "lucide-react";

// Demo user data - in a real app, this would come from an API
const demoUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", orders: 3, joinDate: "2023-08-15" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", orders: 7, joinDate: "2023-07-22" },
  { id: "3", name: "Robert Johnson", email: "robert@example.com", orders: 2, joinDate: "2023-09-10" },
  { id: "4", name: "Emily Brown", email: "emily@example.com", orders: 5, joinDate: "2023-06-05" },
  { id: "5", name: "Michael Wilson", email: "michael@example.com", orders: 1, joinDate: "2023-10-18" }
];

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredUsers = demoUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Users</h1>
        <div className="flex gap-4">
          <Button>Add User</Button>
        </div>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center p-8 border rounded-md">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-xl font-medium mb-2">No users found</p>
          <p className="text-gray-500">Try adjusting your search terms</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.orders}</TableCell>
                  <TableCell>{formatDate(user.joinDate)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;

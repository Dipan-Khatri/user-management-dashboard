import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, Search } from 'lucide-react'

// Mock user data
const users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User", status: "Inactive" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "User", status: "Active" },
  { id: 4, name: "Diana Prince", email: "diana@example.com", role: "Manager", status: "Active" },
  { id: 5, name: "Ethan Hunt", email: "ethan@example.com", role: "User", status: "Active" },
  { id: 6, name: "Fiona Apple", email: "fiona@example.com", role: "User", status: "Inactive" },
  { id: 7, name: "George Michael", email: "george@example.com", role: "Manager", status: "Active" },
  { id: 8, name: "Hannah Montana", email: "hannah@example.com", role: "User", status: "Active" },
  { id: 9, name: "Ian McKellen", email: "ian@example.com", role: "Admin", status: "Active" },
  { id: 10, name: "Julia Roberts", email: "julia@example.com", role: "User", status: "Inactive" },
]

export  function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState<string[]>([])

  const filteredUsers = users.filter(user => 
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (roleFilter.length === 0 || roleFilter.includes(user.role)) &&
    (statusFilter.length === 0 || statusFilter.includes(user.status))
  )

  return (
    
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-2xl font-semibold mb-6">Users</h1>

        {/* Search and filter */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search users..."
              className="pl-8 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Role <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {["Admin", "Manager", "User"].map((role) => (
                  <DropdownMenuCheckboxItem
                    key={role}
                    checked={roleFilter.includes(role)}
                    onCheckedChange={(checked) =>
                      setRoleFilter(
                        checked
                          ? [...roleFilter, role]
                          : roleFilter.filter((item) => item !== role)
                      )
                    }
                  >
                    {role}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Status <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {["Active", "Inactive"].map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={statusFilter.includes(status)}
                    onCheckedChange={(checked) =>
                      setStatusFilter(
                        checked
                          ? [...statusFilter, status]
                          : statusFilter.filter((item) => item !== status)
                      )
                    }
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Users table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    
  )
}
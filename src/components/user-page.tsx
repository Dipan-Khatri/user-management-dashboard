import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription } from '@radix-ui/react-dialog';
import { DialogFooter, DialogHeader } from './dailog';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  lastActive: string;
};

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(25, 'Name must be less than 25 characters.'),
  email: z.string().email({ message: 'Invalid email.' }),
  role: z.string().optional(),
});

type FormType = z.infer<typeof formSchema>;

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      role: '',
    },
  });

  // Fetch users when component mounts
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get('https://66d8adfc37b1cadd8055680f.mockapi.io/api/react_class/users');
        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
  }, []);

  const handleAddUser = async (data: FormType) => {
    try {
      const newUser = { ...data, lastActive: new Date().toISOString() };
      const res = await axios.post('https://66d8adfc37b1cadd8055680f.mockapi.io/api/react_class/users', newUser);
      setUsers([...users, res.data]);
      setShowModal(false);
      form.reset();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleEditUser = async (data: FormType) => {
    try {
      if (!editingUser) return;
      const updatedUser = { ...data, lastActive: new Date().toISOString() };
      await axios.put(`https://66d8adfc37b1cadd8055680f.mockapi.io/api/react_class/users/${editingUser.id}`, updatedUser);
      setUsers(users.map(user => (user.id === editingUser.id ? { ...user, ...updatedUser, id: editingUser.id } : user)));
      setShowModal(false);
      setEditingUser(null);
      form.reset();
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    try {
      await axios.delete(`https://66d8adfc37b1cadd8055680f.mockapi.io/api/react_class/users/${selectedUser.id}`);
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setShowDeleteDialog(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    form.setValue('name', user.name);      
    form.setValue('email', user.email);
    form.setValue('role', user.role);
    setShowModal(true);
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };

  const openAddUserModal = () => {
    setEditingUser(null); // Clear any existing editing user
    form.reset(); // Clear the form values
    setShowModal(true); // Open the add user modal
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex-1 p-8 overflow-auto">
      <h1 className="text-2xl font-semibold mb-6">Users</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input type="text" placeholder="Search users..." className="pl-8 w-64" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <Button variant="default" onClick={openAddUserModal}>Add User</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.lastActive}</TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => openEditModal(user)}>Edit</Button>
                <Button variant="destructive" onClick={() => openDeleteDialog(user)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit/Add User Modal */}
      <Sheet open={showModal} onOpenChange={setShowModal}>
        <SheetContent side="right" className="w-[400px]">
          <SheetHeader>
            <SheetTitle>{editingUser ? 'Edit User' : 'Add New User'}</SheetTitle>
            <SheetDescription>Fill in the details below to {editingUser ? 'edit' : 'add'} a user. Click save when you're done.</SheetDescription>
          </SheetHeader>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(editingUser ? handleEditUser : handleAddUser)} className="space-y-4">
              <FormField name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl><Input placeholder="Name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input placeholder="example@domain.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="role" render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl><Input placeholder="User or Admin" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <SheetFooter>
                <Button type="submit">{editingUser ? 'Save Changes' : 'Add User'}</Button>
                <SheetClose asChild><Button type="button" variant="outline">Cancel</Button></SheetClose>
              </SheetFooter>
            </form>
          </FormProvider>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>Are you sure?</DialogHeader>
          <DialogDescription>Are you sure you want to delete this user?</DialogDescription>
          <DialogFooter>
            <Button variant="destructive" onClick={handleDeleteUser}>Yes, Delete</Button>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>No, Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

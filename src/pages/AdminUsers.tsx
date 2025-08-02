
import { useNavigate } from "react-router-dom";

import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { UserCog, Plus, Edit, Trash2, Shield, Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { userService } from "@/services/userService";

const AdminUsers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();


  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoadingId, setDeleteLoadingId] = useState<number | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await userService.getAll();
      setAdminUsers(res.data || []);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: number, userName: string) => {
    setDeleteLoadingId(userId);
    try {
      await userService.delete(userId);
      toast({
        title: "Admin User Deleted",
        description: `${userName} has been successfully deleted.`,
      });
      fetchUsers();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message || "Failed to delete user",
        variant: "destructive",
      });
    } finally {
      setDeleteLoadingId(null);
    }
  };


  const getRoleIcon = (role: string) => {
    return role === "super-admin" ? <Crown className="h-4 w-4" /> : <Shield className="h-4 w-4" />;
  };

  const getRoleBadge = (role: string) => {
    return role === "super-admin" ? "destructive" : "secondary";
  };

  // Stats
  const totalAdmins = adminUsers.length;
  const superAdmins = adminUsers.filter(u => u.role === "super-admin").length;
  const subAdmins = adminUsers.filter(u => u.role === "sub-admin").length;
  const activeAdmins = adminUsers.filter(u => u.active !== false).length;
  const inactiveAdmins = totalAdmins - activeAdmins;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Users</h1>
            <p className="text-muted-foreground">Manage system administrators and their permissions</p>
          </div>
          <Button className="bg-gradient-primary" onClick={() => navigate("/admin-users/add")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Admin User
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
              <UserCog className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? "-" : totalAdmins}</div>
              <p className="text-xs text-muted-foreground">{activeAdmins} active, {inactiveAdmins} inactive</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Super Admins</CardTitle>
              <Crown className="h-4 w-4 text-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? "-" : superAdmins}</div>
              <p className="text-xs text-muted-foreground">Full system access</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sub Admins</CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? "-" : subAdmins}</div>
              <p className="text-xs text-muted-foreground">Limited access</p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Admin Users List</CardTitle>
            <CardDescription>Manage administrator accounts and their access levels</CardDescription>
          </CardHeader>
          <CardContent>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">Loading...</TableCell>
                  </TableRow>
                ) : adminUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">No admin users found.</TableCell>
                  </TableRow>
                ) : (
                  adminUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadge(user.role)} className="flex items-center gap-1 w-fit">
                          {getRoleIcon(user.role)}
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.active !== false ? "default" : "secondary"}>
                          {user.active !== false ? "active" : "inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => navigate(`/admin-users/edit/${user.id}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline" disabled={deleteLoadingId === user.id}>
                                {deleteLoadingId === user.id ? (
                                  <span className="animate-spin"><Trash2 className="h-4 w-4" /></span>
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Admin User</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{user.name}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteUser(user.id, user.name)} disabled={deleteLoadingId === user.id}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminUsers;

import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserCog, Plus, Edit, Trash2, Shield, Crown } from "lucide-react";

const AdminUsers = () => {
  const navigate = useNavigate();
  const adminUsers = [
    {
      id: 1,
      fullName: "Rajesh Kumar",
      email: "rajesh@zipzag.com",
      phone: "+91 98765 43210",
      role: "super-admin",
      status: "active",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      fullName: "Priya Sharma",
      email: "priya@zipzag.com", 
      phone: "+91 87654 32109",
      role: "sub-admin",
      status: "active",
      createdAt: "2024-02-20"
    },
    {
      id: 3,
      fullName: "Amit Patel",
      email: "amit@zipzag.com",
      phone: "+91 76543 21098", 
      role: "sub-admin",
      status: "inactive",
      createdAt: "2024-03-10"
    }
  ];

  const getRoleIcon = (role: string) => {
    return role === "super-admin" ? <Crown className="h-4 w-4" /> : <Shield className="h-4 w-4" />;
  };

  const getRoleBadge = (role: string) => {
    return role === "super-admin" ? "destructive" : "secondary";
  };

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
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">3 active, 2 inactive</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Super Admins</CardTitle>
              <Crown className="h-4 w-4 text-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Full system access</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sub Admins</CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adminUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.fullName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadge(user.role)} className="flex items-center gap-1 w-fit">
                        {getRoleIcon(user.role)}
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminUsers;
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Plus, Edit, Trash2, Eye, BookOpen, MessageSquare, TrendingUp } from "lucide-react";

const Customers = () => {
  const customers = [
    {
      id: 1,
      name: "Pristine Jewelers Mumbai",
      email: "orders@pristinejewelers.com",
      phone: "+91 98765 43210",
      status: "active",
      totalCatalogs: 8,
      totalInquiries: 12,
      lastLogin: "2024-07-14",
      joinedDate: "2024-01-15",
      region: "Mumbai"
    },
    {
      id: 2,
      name: "Golden Palace Jewelers",
      email: "info@goldenpalace.in",
      phone: "+91 87654 32109",
      status: "active",
      totalCatalogs: 15,
      totalInquiries: 28,
      lastLogin: "2024-07-15",
      joinedDate: "2024-02-20",
      region: "Delhi"
    },
    {
      id: 3,
      name: "Royal Gems & Jewelry",
      email: "sales@royalgems.co.in",
      phone: "+91 76543 21098",
      status: "active",
      totalCatalogs: 6,
      totalInquiries: 5,
      lastLogin: "2024-07-13",
      joinedDate: "2024-03-10",
      region: "Bangalore"
    },
    {
      id: 4,
      name: "Heritage Jewels Kolkata",
      email: "heritage@jewelskolkata.com",
      phone: "+91 65432 10987",
      status: "inactive",
      totalCatalogs: 3,
      totalInquiries: 2,
      lastLogin: "2024-06-28",
      joinedDate: "2024-04-05",
      region: "Kolkata"
    },
    {
      id: 5,
      name: "Diamond Dreams Chennai",
      email: "contact@diamonddreams.in",
      phone: "+91 54321 09876",
      status: "active",
      totalCatalogs: 12,
      totalInquiries: 18,
      lastLogin: "2024-07-16",
      joinedDate: "2024-05-12",
      region: "Chennai"
    }
  ];

  const getStatusColor = (status: string) => {
    return status === "active" ? "default" : "secondary";
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Customers</h1>
            <p className="text-muted-foreground">Manage jewelry store customers and their catalog access</p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,847</div>
              <p className="text-xs text-muted-foreground">1,623 active, 224 inactive</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Catalogs</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">Shared with customers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,389</div>
              <p className="text-xs text-muted-foreground">47 pending review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12.5%</div>
              <p className="text-xs text-muted-foreground">New customers this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Directory</CardTitle>
            <CardDescription>Manage customer accounts and their catalog access permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Catalogs</TableHead>
                  <TableHead>Inquiries</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">Joined {customer.joinedDate}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">{customer.email}</div>
                        <div className="text-sm text-muted-foreground">{customer.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{customer.region}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(customer.status)}>
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        {customer.totalCatalogs}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        {customer.totalInquiries}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{customer.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
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

export default Customers;
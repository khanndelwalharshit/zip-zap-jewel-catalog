import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Plus, Edit, Trash2, Eye, Lock, Users, Package, Share } from "lucide-react";

const Catalogs = () => {
  const navigate = useNavigate();
  const catalogs = [
    {
      id: 1,
      name: "Premium Diamond Collection 2024",
      customerName: "Pristine Jewelers Mumbai",
      customerId: 1,
      hasPassword: true,
      totalProducts: 45,
      status: "active",
      createdAt: "2024-01-15",
      lastUpdated: "2024-07-10",
      views: 234,
      inquiries: 12
    },
    {
      id: 2,
      name: "Traditional Gold Jewelry",
      customerName: "Golden Palace Jewelers",
      customerId: 2,
      hasPassword: false,
      totalProducts: 78,
      status: "active", 
      createdAt: "2024-02-20",
      lastUpdated: "2024-07-14",
      views: 189,
      inquiries: 8
    },
    {
      id: 3,
      name: "Wedding Collection Special",
      customerName: "Royal Gems & Jewelry",
      customerId: 3,
      hasPassword: true,
      totalProducts: 62,
      status: "active",
      createdAt: "2024-03-10",
      lastUpdated: "2024-07-12",
      views: 456,
      inquiries: 15
    },
    {
      id: 4,
      name: "Silver Jewelry Showcase",
      customerName: "Heritage Jewels Kolkata",
      customerId: 4,
      hasPassword: false,
      totalProducts: 34,
      status: "inactive",
      createdAt: "2024-04-05",
      lastUpdated: "2024-06-28",
      views: 67,
      inquiries: 2
    },
    {
      id: 5,
      name: "Festive Collection 2024",
      customerName: "Diamond Dreams Chennai",
      customerId: 5,
      hasPassword: true,
      totalProducts: 89,
      status: "active",
      createdAt: "2024-05-12",
      lastUpdated: "2024-07-15",
      views: 312,
      inquiries: 18
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
            <h1 className="text-3xl font-bold text-foreground">Catalogs</h1>
            <p className="text-muted-foreground">Manage personalized product catalogs for customers</p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Create Catalog
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Catalogs</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">142 active, 14 inactive</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Password Protected</CardTitle>
              <Lock className="h-4 w-4 text-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">57% with security</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Products</CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68</div>
              <p className="text-xs text-muted-foreground">Per catalog</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.8K</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Catalogs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Catalog Management</CardTitle>
            <CardDescription>Create and manage personalized product catalogs for each customer</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Catalog Name</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Security</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Inquiries</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {catalogs.map((catalog) => (
                  <TableRow key={catalog.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{catalog.name}</div>
                        <div className="text-sm text-muted-foreground">Created {catalog.createdAt}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {catalog.customerName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        {catalog.totalProducts}
                      </div>
                    </TableCell>
                    <TableCell>
                      {catalog.hasPassword ? (
                        <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                          <Lock className="h-3 w-3" />
                          Protected
                        </Badge>
                      ) : (
                        <Badge variant="outline">Public</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(catalog.status)}>
                        {catalog.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        {catalog.views}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        {catalog.inquiries}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{catalog.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          <Share className="h-4 w-4" />
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

export default Catalogs;
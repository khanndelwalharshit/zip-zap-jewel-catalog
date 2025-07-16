import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageSquare, Plus, Edit, Trash2, Eye, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const Inquiries = () => {
  const inquiries = [
    {
      id: 1,
      customerName: "Pristine Jewelers Mumbai",
      catalogName: "Premium Diamond Collection 2024",
      productName: "Classic Diamond Solitaire Ring",
      message: "Can you provide more details about the diamond's clarity and certification? Also interested in bulk pricing for 5+ pieces.",
      status: "pending",
      createdAt: "2024-07-15",
      customerEmail: "orders@pristinejewelers.com",
      priority: "high"
    },
    {
      id: 2,
      customerName: "Golden Palace Jewelers",
      catalogName: "Traditional Gold Jewelry",
      productName: "22K Gold Traditional Necklace",
      message: "What is the weight of this necklace? Do you have similar designs in different weights?",
      status: "responded",
      createdAt: "2024-07-14",
      customerEmail: "info@goldenpalace.in",
      priority: "medium"
    },
    {
      id: 3,
      customerName: "Royal Gems & Jewelry",
      catalogName: "Wedding Collection Special",
      productName: "Pearl Drop Earrings",
      message: "These earrings are perfect for our upcoming bridal collection. Can we schedule a meeting to discuss wholesale rates?",
      status: "pending",
      createdAt: "2024-07-13",
      customerEmail: "sales@royalgems.co.in",
      priority: "high"
    },
    {
      id: 4,
      customerName: "Diamond Dreams Chennai",
      catalogName: "Festive Collection 2024",
      productName: "Emerald Tennis Bracelet",
      message: "Is this piece available in different sizes? Also need information about the emerald origin and quality grading.",
      status: "closed",
      createdAt: "2024-07-12",
      customerEmail: "contact@diamonddreams.in",
      priority: "low"
    },
    {
      id: 5,
      customerName: "Heritage Jewels Kolkata",
      catalogName: "Silver Jewelry Showcase",
      productName: "Platinum Wedding Band",
      message: "Can you customize this design in silver instead of platinum? Looking for cost-effective alternatives.",
      status: "responded",
      createdAt: "2024-07-10",
      customerEmail: "heritage@jewelskolkata.com",
      priority: "medium"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "destructive";
      case "responded": return "default";
      case "closed": return "secondary";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "responded": return <CheckCircle className="h-4 w-4" />;
      case "closed": return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "outline";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Inquiries</h1>
            <p className="text-muted-foreground">Manage customer product inquiries and responses</p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Manual Inquiry
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,389</div>
              <p className="text-xs text-muted-foreground">All time inquiries</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">Awaiting response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Responded</CardTitle>
              <CheckCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,198</div>
              <p className="text-xs text-muted-foreground">Customer replied</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">Within 24 hours</p>
            </CardContent>
          </Card>
        </div>

        {/* Inquiries Table */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Inquiries</CardTitle>
            <CardDescription>Track and respond to product inquiries from catalog viewers</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{inquiry.customerName}</div>
                        <div className="text-sm text-muted-foreground">{inquiry.customerEmail}</div>
                        <div className="text-xs text-muted-foreground">via {inquiry.catalogName}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-sm">{inquiry.productName}</div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm truncate" title={inquiry.message}>
                          {inquiry.message}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPriorityColor(inquiry.priority)}>
                        {inquiry.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(inquiry.status)} className="flex items-center gap-1 w-fit">
                        {getStatusIcon(inquiry.status)}
                        {inquiry.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{inquiry.createdAt}</TableCell>
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

export default Inquiries;
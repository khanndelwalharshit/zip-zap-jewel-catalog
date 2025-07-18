import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FolderTree, Plus, Edit, Trash2, Eye, ChevronRight } from "lucide-react";

const Categories = () => {
  const navigate = useNavigate();
  const categories = [
    {
      id: 1,
      name: "Rings",
      description: "All types of rings for various occasions",
      parentId: null,
      level: 0,
      status: "active",
      subcategories: 8,
      products: 324
    },
    {
      id: 2,
      name: "Engagement Rings",
      description: "Beautiful engagement rings with diamonds",
      parentId: 1,
      level: 1,
      status: "active",
      subcategories: 3,
      products: 145
    },
    {
      id: 3,
      name: "Solitaire Rings",
      description: "Classic solitaire diamond rings",
      parentId: 2,
      level: 2,
      status: "active", 
      subcategories: 0,
      products: 67
    },
    {
      id: 4,
      name: "Necklaces",
      description: "Elegant necklaces in gold and silver",
      parentId: null,
      level: 0,
      status: "active",
      subcategories: 12,
      products: 542
    },
    {
      id: 5,
      name: "Gold Necklaces",
      description: "Traditional and modern gold necklaces",
      parentId: 4,
      level: 1,
      status: "active",
      subcategories: 5,
      products: 289
    },
    {
      id: 6,
      name: "22K Gold Necklaces",
      description: "Premium 22 karat gold necklaces",
      parentId: 5,
      level: 2,
      status: "active",
      subcategories: 0,
      products: 156
    },
    {
      id: 7,
      name: "Bracelets",
      description: "Stylish bracelets for all occasions",
      parentId: null,
      level: 0,
      status: "inactive",
      subcategories: 6,
      products: 198
    }
  ];

  const getIndentation = (level: number) => {
    return level * 20;
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Categories</h1>
            <p className="text-muted-foreground">Manage product categories with n-level nesting support</p>
          </div>
          <Button 
            className="bg-gradient-primary"
            onClick={() => navigate("/categories/add")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
              <FolderTree className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">All levels included</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Parent Categories</CardTitle>
              <FolderTree className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Top level categories</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Categories</CardTitle>
              <Eye className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">22</div>
              <p className="text-xs text-muted-foreground">Visible in catalogs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Max Depth</CardTitle>
              <ChevronRight className="h-4 w-4 text-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Nesting levels</p>
            </CardContent>
          </Card>
        </div>

        {/* Categories Tree Table */}
        <Card>
          <CardHeader>
            <CardTitle>Category Hierarchy</CardTitle>
            <CardDescription>Manage nested product categories with unlimited levels</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subcategories</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div 
                        className="flex items-center font-medium"
                        style={{ paddingLeft: getIndentation(category.level) }}
                      >
                        {category.level > 0 && (
                          <ChevronRight className="h-4 w-4 text-muted-foreground mr-1" />
                        )}
                        {category.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{category.description}</TableCell>
                    <TableCell>
                      <Badge variant="outline">Level {category.level}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={category.status === "active" ? "default" : "secondary"}>
                        {category.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{category.subcategories}</TableCell>
                    <TableCell>{category.products}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          <Plus className="h-4 w-4" />
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

export default Categories;
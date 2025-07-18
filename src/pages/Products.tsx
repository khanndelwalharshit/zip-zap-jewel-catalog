import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Plus, Edit, Trash2, Eye, Star, TrendingUp } from "lucide-react";

const Products = () => {
  const navigate = useNavigate();
  const products = [
    {
      id: 1,
      name: "Classic Diamond Solitaire Ring",
      shortDescription: "Elegant 1-carat diamond solitaire",
      longDescription: "A timeless 1-carat round cut diamond set in platinum band with exceptional clarity and color grading",
      basePrice: 125000,
      offerPercent: 15,
      categoryId: 3,
      categoryName: "Solitaire Rings",
      status: "active",
      createdAt: "2024-01-15",
      inCatalogs: 12
    },
    {
      id: 2,
      name: "22K Gold Traditional Necklace",
      shortDescription: "Handcrafted traditional gold necklace",
      longDescription: "Beautiful 22-karat gold necklace featuring traditional Indian motifs with intricate craftsmanship",
      basePrice: 85000,
      offerPercent: 10,
      categoryId: 6,
      categoryName: "22K Gold Necklaces",
      status: "active", 
      createdAt: "2024-02-20",
      inCatalogs: 8
    },
    {
      id: 3,
      name: "Pearl Drop Earrings",
      shortDescription: "Elegant freshwater pearl earrings",
      longDescription: "Sophisticated freshwater pearl drop earrings with sterling silver setting, perfect for formal occasions",
      basePrice: 12500,
      offerPercent: 20,
      categoryId: 8,
      categoryName: "Pearl Earrings",
      status: "active",
      createdAt: "2024-03-10",
      inCatalogs: 15
    },
    {
      id: 4,
      name: "Platinum Wedding Band",
      shortDescription: "Premium platinum wedding ring",
      longDescription: "Sophisticated platinum wedding band with brushed finish and comfort fit design for everyday wear",
      basePrice: 45000,
      offerPercent: 0,
      categoryId: 2,
      categoryName: "Wedding Rings",
      status: "inactive",
      createdAt: "2024-03-25",
      inCatalogs: 3
    },
    {
      id: 5,
      name: "Emerald Tennis Bracelet",
      shortDescription: "Stunning emerald tennis bracelet",
      longDescription: "Luxury tennis bracelet featuring genuine emeralds set in 18k white gold with secure clasp mechanism",
      basePrice: 185000,
      offerPercent: 25,
      categoryId: 7,
      categoryName: "Bracelets",
      status: "active",
      createdAt: "2024-04-05",
      inCatalogs: 6
    }
  ];

  const calculateFinalPrice = (basePrice: number, offerPercent: number) => {
    return basePrice - (basePrice * offerPercent / 100);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Products</h1>
            <p className="text-muted-foreground">Manage jewelry products and their catalog associations</p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,456</div>
              <p className="text-xs text-muted-foreground">2,234 active, 222 inactive</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹12.5 Cr</div>
              <p className="text-xs text-muted-foreground">Total stock value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Price</CardTitle>
              <Star className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹51K</div>
              <p className="text-xs text-muted-foreground">Per product</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Catalogs</CardTitle>
              <Eye className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,987</div>
              <p className="text-xs text-muted-foreground">Featured products</p>
            </CardContent>
          </Card>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Product Inventory</CardTitle>
            <CardDescription>Manage product details, pricing, and catalog associations</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Base Price</TableHead>
                  <TableHead>Offer</TableHead>
                  <TableHead>Final Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>In Catalogs</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.shortDescription}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.categoryName}</Badge>
                    </TableCell>
                    <TableCell>{formatPrice(product.basePrice)}</TableCell>
                    <TableCell>
                      {product.offerPercent > 0 ? (
                        <Badge variant="destructive">{product.offerPercent}% OFF</Badge>
                      ) : (
                        <span className="text-muted-foreground">No offer</span>
                      )}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatPrice(calculateFinalPrice(product.basePrice, product.offerPercent))}
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.status === "active" ? "default" : "secondary"}>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        {product.inCatalogs}
                      </div>
                    </TableCell>
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

export default Products;
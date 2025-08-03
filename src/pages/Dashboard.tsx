import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Package, 
  FolderTree, 
  BookOpen, 
  MessageSquare, 
  TrendingUp,
  Crown,
  Star,
  Diamond,
  ShoppingBag,
  Eye,
  Clock
} from "lucide-react";
import heroImage from "@/assets/jewelry-dashboard-hero.jpg";
import jewelryCollection from "@/assets/jewelry-collection.jpg";
import goldBracelet from "@/assets/gold-bracelet.jpg";
import diamondRing from "@/assets/diamond-ring.jpg";
import pearlNecklace from "@/assets/pearl-necklace.jpg";
import { customerService } from "@/services/customerService";
import { productService } from "@/services/productService";
import { catalogService } from "@/services/catalogService";
import { inquiryService } from "@/services/inquiryService";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [catalogCount, setCatalogCount] = useState(0);
  const [inquiryCount, setInquiryCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customers = await customerService.getAll();
        setCustomerCount(customers.data.length);

        const products = await productService.getAll();
        setProductCount(products.data.length);

        const catalogs = await catalogService.getAll();
        setCatalogCount(catalogs.data.length);

        const inquiries = await inquiryService.getAll();
        setInquiryCount(inquiries.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: "Total Customers",
      value: customerCount,
      change: "+18%",
      icon: Users,
      color: "text-primary",
      description: "Premium jewelry clients"
    },
    {
      title: "Active Products",
      value: productCount,
      change: "+12%", 
      icon: Package,
      color: "text-success",
      description: "Jewelry items in catalog"
    },
    {
      title: "Live Catalogs",
      value: catalogCount,
      change: "+24%",
      icon: BookOpen,
      color: "text-gold",
      description: "Personalized collections"
    },
    {
      title: "Pending Inquiries",
      value: inquiryCount,
      change: "+8%",
      icon: MessageSquare,
      color: "text-warning",
      description: "Customer inquiries"
    }
  ];

  const recentActivity = [
    { 
      type: "catalog", 
      message: "Luxury Diamond Collection catalog created for Pristine Jewelers Mumbai", 
      time: "1 hour ago", 
      status: "success",
      customer: "Pristine Jewelers",
      icon: BookOpen
    },
    { 
      type: "inquiry", 
      message: "Product inquiry: 22K Gold Bridal Set by customer Rajesh Kumar", 
      time: "2 hours ago", 
      status: "pending",
      customer: "Rajesh Kumar",
      icon: MessageSquare
    },
    { 
      type: "product", 
      message: "New Diamond Earrings collection added - 18 items", 
      time: "3 hours ago", 
      status: "info",
      customer: "System",
      icon: Diamond
    },
    { 
      type: "customer", 
      message: "New premium customer registered: Golden Palace Jewelers", 
      time: "5 hours ago", 
      status: "success",
      customer: "Golden Palace Jewelers",
      icon: Users
    },
    { 
      type: "catalog", 
      message: "Bridal Collection catalog shared with Shree Ganesh Jewelers", 
      time: "8 hours ago", 
      status: "info",
      customer: "Shree Ganesh Jewelers",
      icon: Star
    },
    { 
      type: "inquiry", 
      message: "Bulk order inquiry for Temple Jewelry collection", 
      time: "1 day ago", 
      status: "pending",
      customer: "Heritage Jewels",
      icon: MessageSquare
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "22K Gold Bracelet",
      category: "Bracelets",
      price: "₹45,000",
      image: goldBracelet,
      status: "bestseller"
    },
    {
      id: 2,
      name: "Diamond Engagement Ring",
      category: "Rings",
      price: "₹125,000", 
      image: diamondRing,
      status: "new"
    },
    {
      id: 3,
      name: "Pearl Necklace Set",
      category: "Necklaces",
      price: "₹35,000",
      image: pearlNecklace,
      status: "trending"
    }
  ];

  return (
    
      <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden rounded-lg mb-8">
        <img 
          src={heroImage} 
          alt="Jewelry Dashboard" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-glow/70 flex items-center">
          <div className="max-w-4xl mx-auto px-6 text-primary-foreground">
            <div className="flex items-center gap-3 mb-4">
              <Crown className="h-8 w-8 text-gold" />
              <h1 className="text-4xl font-bold">ZipZag Catalog System</h1>
            </div>
            <p className="text-xl opacity-90 mb-6">Premium Jewelry Catalog Management Platform</p>
            <div className="flex gap-4">
              <Link to="/catalogs/add">
                <Button variant="gold" size="lg">
                  <Star className="mr-2 h-5 w-5" />
                  Create New Catalog
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <TrendingUp className="mr-2 h-5 w-5" />
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mb-1">{stat.description}</p>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Diamond className="h-5 w-5 text-gold" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/categories">
              <Button variant="premium" className="w-full justify-start" size="sm">
                <FolderTree className="mr-2 h-4 w-4" />
                Manage Categories
              </Button>
            </Link>
            <Link to="/products/add">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Package className="mr-2 h-4 w-4" />
                Add New Product
              </Button>
            </Link>
            <Link to="/customers">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Users className="mr-2 h-4 w-4" />
                Customer Management
              </Button>
            </Link>
            <Link to="/catalogs/add">
              <Button variant="gold" className="w-full justify-start" size="sm">
                <BookOpen className="mr-2 h-4 w-4" />
                Create Catalog
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-3 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Activity
              <Badge variant="outline" className="text-xs">Live Updates</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex-shrink-0">
                    <activity.icon className={`h-5 w-5 ${
                      activity.status === 'success' ? 'text-success' :
                      activity.status === 'pending' ? 'text-warning' : 'text-primary'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {activity.customer}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant={
                    activity.status === 'success' ? 'default' :
                    activity.status === 'pending' ? 'secondary' : 'outline'
                  } className="text-xs">
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Products Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-gold" />
              Collection Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <img 
              src={jewelryCollection} 
              alt="Jewelry Collection" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="space-y-2">
              <div className="flex justify-.tsx-between text-sm">
                <span className="text-muted-foreground">Categories</span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Active Products</span>
                <span className="font-medium">2,456</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Value</span>
                <span className="font-medium text-primary">₹12.5 Cr</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Products */}
        <Card className="lg:col-span-3 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Featured Products
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredProducts.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <Badge 
                      variant={product.status === 'bestseller' ? 'default' : 'secondary'} 
                      className="absolute top-2 right-2 text-xs"
                    >
                      {product.status}
                    </Badge>
                  </div>
                  <h4 className="font-medium text-sm mb-1">{product.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">{product.price}</span>
                    <Button variant="outline" size="sm">
                      <ShoppingBag className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    
  );
};

export default Dashboard;

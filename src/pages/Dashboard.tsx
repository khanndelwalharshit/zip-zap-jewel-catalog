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
  Diamond
} from "lucide-react";
import heroImage from "@/assets/jewelry-dashboard-hero.jpg";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Customers",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Active Products",
      value: "456",
      change: "+8%", 
      icon: Package,
      color: "text-success"
    },
    {
      title: "Live Catalogs",
      value: "89",
      change: "+15%",
      icon: BookOpen,
      color: "text-gold"
    },
    {
      title: "Pending Inquiries",
      value: "23",
      change: "-5%",
      icon: MessageSquare,
      color: "text-warning"
    }
  ];

  const recentActivity = [
    { type: "catalog", message: "New catalog created for Premium Jewels Ltd", time: "2 hours ago", status: "success" },
    { type: "inquiry", message: "Inquiry received for 22K Gold Bracelet", time: "4 hours ago", status: "pending" },
    { type: "product", message: "Diamond Ring collection updated", time: "6 hours ago", status: "info" },
    { type: "customer", message: "New customer registration: Sarah Johnson", time: "1 day ago", status: "success" },
  ];

  return (
    <div className="min-h-screen bg-gradient-elegant">
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
              <Button variant="gold" size="lg">
                <Star className="mr-2 h-5 w-5" />
                Create New Catalog
              </Button>
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
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Diamond className="h-5 w-5 text-gold" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="premium" className="w-full justify-start">
              <FolderTree className="mr-2 h-4 w-4" />
              Manage Categories
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Package className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Customer Management
            </Button>
            <Button variant="gold" className="w-full justify-start">
              <BookOpen className="mr-2 h-4 w-4" />
              Create Catalog
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-success' :
                      activity.status === 'pending' ? 'bg-warning' : 'bg-primary'
                    }`} />
                    <div>
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                  <Badge variant={
                    activity.status === 'success' ? 'default' :
                    activity.status === 'pending' ? 'secondary' : 'outline'
                  }>
                    {activity.status}
                  </Badge>
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
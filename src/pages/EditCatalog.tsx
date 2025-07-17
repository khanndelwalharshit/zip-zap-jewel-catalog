import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Save, BookOpen, User, Plus, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";

const formSchema = z.object({
  name: z.string().min(2, "Catalog name must be at least 2 characters"),
  customerId: z.string().min(1, "Please select a customer"),
  hasPassword: z.boolean().default(false),
  password: z.string().optional(),
  status: z.boolean().default(true),
});

type FormData = z.infer<typeof formSchema>;

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

const EditCatalog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      customerId: "",
      hasPassword: false,
      password: "",
      status: true,
    },
  });

  const hasPassword = form.watch("hasPassword");

  // Load catalog data
  useEffect(() => {
    const loadCatalog = async () => {
      try {
        // Simulate API call to load catalog data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Sample data - in real app this would come from API
        const catalogData = {
          name: "Diwali Special Collection",
          customerId: "1",
          hasPassword: true,
          password: "diwali2024",
          status: true,
        };

        const catalogProducts: Product[] = [
          { id: "1", name: "22K Gold Chain", price: 45000, category: "Necklaces", image: "/placeholder.svg" },
          { id: "2", name: "Diamond Ring", price: 125000, category: "Rings", image: "/placeholder.svg" },
          { id: "4", name: "Gold Bracelet", price: 28000, category: "Bracelets", image: "/placeholder.svg" },
        ];
        
        form.reset(catalogData);
        setSelectedProducts(catalogProducts);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load catalog data",
          variant: "destructive",
        });
      } finally {
        setIsDataLoading(false);
      }
    };

    loadCatalog();
  }, [id, form, toast]);

  const onSubmit = async (data: FormData) => {
    if (selectedProducts.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one product for the catalog",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Catalog updated successfully",
      });
      
      navigate("/catalogs");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update catalog",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Sample customers for dropdown
  const customers = [
    { id: "1", name: "Rajesh Kumar", email: "rajesh@example.com" },
    { id: "2", name: "Priya Sharma", email: "priya@example.com" },
    { id: "3", name: "Amit Patel", email: "amit@example.com" },
    { id: "4", name: "Sneha Reddy", email: "sneha@example.com" },
  ];

  // Sample products
  const allProducts: Product[] = [
    { id: "1", name: "22K Gold Chain", price: 45000, category: "Necklaces", image: "/placeholder.svg" },
    { id: "2", name: "Diamond Ring", price: 125000, category: "Rings", image: "/placeholder.svg" },
    { id: "3", name: "Pearl Necklace", price: 35000, category: "Necklaces", image: "/placeholder.svg" },
    { id: "4", name: "Gold Bracelet", price: 28000, category: "Bracelets", image: "/placeholder.svg" },
    { id: "5", name: "Ruby Earrings", price: 65000, category: "Earrings", image: "/placeholder.svg" },
    { id: "6", name: "Emerald Pendant", price: 85000, category: "Pendants", image: "/placeholder.svg" },
  ];

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedProducts.some(selected => selected.id === product.id)
  );

  const addProduct = (product: Product) => {
    setSelectedProducts([...selectedProducts, product]);
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  if (isDataLoading) {
    return (
      <Layout>
        <div className="container mx-auto p-6 space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-32" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-80" />
                </CardHeader>
                <CardContent className="space-y-6">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/catalogs")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Catalogs
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Edit Catalog</h1>
              <p className="text-muted-foreground">Update catalog information and products</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Catalog Information</CardTitle>
                <CardDescription>
                  Update the basic details for the catalog
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Catalog Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Catalog Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Diwali Collection 2024" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Customer Selection */}
                    <FormField
                      control={form.control}
                      name="customerId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Customer *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a customer" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {customers.map((customer) => (
                                <SelectItem key={customer.id} value={customer.id}>
                                  <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <div>
                                      <p className="font-medium">{customer.name}</p>
                                      <p className="text-xs text-muted-foreground">{customer.email}</p>
                                    </div>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Password Protection */}
                    <FormField
                      control={form.control}
                      name="hasPassword"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Password Protection</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Require a password to access this catalog
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Password Field */}
                    {hasPassword && (
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Catalog Password *</FormLabel>
                            <FormControl>
                              <Input 
                                type="password"
                                placeholder="Enter password for catalog access"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* Status */}
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Active Status</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Enable this catalog to be accessible to the customer
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Selected Products */}
            <Card>
              <CardHeader>
                <CardTitle>Selected Products ({selectedProducts.length})</CardTitle>
                <CardDescription>
                  Products that are included in this catalog
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedProducts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No products selected yet. Choose products from the sidebar.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {product.category}
                              </Badge>
                              <span className="text-sm font-semibold text-primary">
                                ₹{product.price.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProduct(product.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Product Selection Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Products</CardTitle>
                <CardDescription>
                  Search and select products to include in the catalog
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Product List */}
                <ScrollArea className="h-96">
                  <div className="space-y-2">
                    {filteredProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-2 border rounded-lg hover:bg-muted/50">
                        <div className="flex items-center gap-2">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-8 h-8 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{product.name}</p>
                            <div className="flex items-center gap-1">
                              <Badge variant="outline" className="text-xs">
                                {product.category}
                              </Badge>
                              <span className="text-xs text-primary font-semibold">
                                ₹{product.price.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => addProduct(product)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {filteredProducts.length === 0 && (
                      <div className="text-center py-4 text-muted-foreground text-sm">
                        {searchQuery ? "No products match your search" : "All products are already selected"}
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate("/catalogs")}
          >
            Cancel
          </Button>
          <Button 
            onClick={form.handleSubmit(onSubmit)} 
            disabled={isLoading} 
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            {isLoading ? "Updating..." : "Update Catalog"}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default EditCatalog;
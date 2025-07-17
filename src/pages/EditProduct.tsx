import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Save, Package, Upload, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/layout/Layout";

const formSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  shortDescription: z.string().max(100, "Short description must be under 100 characters"),
  longDescription: z.string().min(10, "Long description must be at least 10 characters"),
  basePrice: z.number().min(1, "Base price must be greater than 0"),
  offerPercentage: z.number().min(0).max(100, "Offer percentage must be between 0-100").optional(),
  categoryId: z.string().min(1, "Please select a category"),
  status: z.boolean().default(true),
});

type FormData = z.infer<typeof formSchema>;

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [productImages, setProductImages] = useState<string[]>([
    "/placeholder.svg",
    "/placeholder.svg"
  ]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      longDescription: "",
      basePrice: 0,
      offerPercentage: 0,
      categoryId: "",
      status: true,
    },
  });

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      try {
        // Simulate API call to load product data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Sample data - in real app this would come from API
        const productData = {
          name: "22K Gold Diamond Bracelet",
          shortDescription: "Elegant bracelet with premium diamonds",
          longDescription: "Handcrafted 22K gold bracelet featuring premium diamonds in a traditional design. Perfect for special occasions and festivals. Each piece is carefully crafted by skilled artisans.",
          basePrice: 75000,
          offerPercentage: 15,
          categoryId: "3",
          status: true,
        };
        
        form.reset(productData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load product data",
          variant: "destructive",
        });
      } finally {
        setIsDataLoading(false);
      }
    };

    loadProduct();
  }, [id, form, toast]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
      
      navigate("/products");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Sample categories for dropdown
  const categories = [
    { id: "1", name: "Rings" },
    { id: "2", name: "Necklaces" },
    { id: "3", name: "Bracelets" },
    { id: "4", name: "Earrings" },
    { id: "5", name: "Pendants" },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // In a real app, you would upload these to your server/cloud storage
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setProductImages([...productImages, ...newImages]);
    }
  };

  const basePrice = form.watch("basePrice");
  const offerPercentage = form.watch("offerPercentage") || 0;
  const finalPrice = basePrice - (basePrice * offerPercentage / 100);

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
                  <Skeleton className="h-24 w-full" />
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
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
            onClick={() => navigate("/products")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Edit Product</h1>
              <p className="text-muted-foreground">Update product information</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Update the basic details of your product
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Product Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 22K Gold Chain Necklace" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Category */}
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Short Description */}
                    <FormField
                      control={form.control}
                      name="shortDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Short Description</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Brief product summary (max 100 chars)"
                              {...field}
                            />
                          </FormControl>
                          <div className="text-xs text-muted-foreground">
                            {field.value?.length || 0}/100 characters
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Long Description */}
                    <FormField
                      control={form.control}
                      name="longDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Detailed Description *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Detailed product description including materials, craftsmanship, and features..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Status */}
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Active Status</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Enable this product to be visible in catalogs
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IndianRupee className="h-5 w-5" />
                  Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="basePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Base Price (₹) *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          placeholder="50000"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="offerPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Offer Percentage (%)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          placeholder="10"
                          min="0"
                          max="100"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {basePrice > 0 && (
                  <div className="p-3 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Base Price:</span>
                      <span>₹{basePrice.toLocaleString()}</span>
                    </div>
                    {offerPercentage > 0 && (
                      <div className="flex justify-between text-sm text-destructive">
                        <span>Discount ({offerPercentage}%):</span>
                        <span>-₹{(basePrice * offerPercentage / 100).toLocaleString()}</span>
                      </div>
                    )}
                    <hr />
                    <div className="flex justify-between font-semibold">
                      <span>Final Price:</span>
                      <span className="text-primary">₹{finalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Product Images */}
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                  Update product images
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag & drop images or click to browse
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    Choose Files
                  </Button>
                </div>

                {productImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {productImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4 lg:col-span-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate("/products")}
          >
            Cancel
          </Button>
          <Button 
            onClick={form.handleSubmit(onSubmit)} 
            disabled={isLoading} 
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            {isLoading ? "Updating..." : "Update Product"}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default EditProduct;
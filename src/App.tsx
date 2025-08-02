import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminUsers from "./pages/AdminUsers";
import AddAdminUser from "./pages/AddAdminUser";
import EditAdminUser from "./pages/EditAdminUser";
import Categories from "./pages/Categories";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Customers from "./pages/Customers";
import AddCustomer from "./pages/AddCustomer";
import Catalogs from "./pages/Catalogs";
import AddCatalog from "./pages/AddCatalog";
import EditCatalog from "./pages/EditCatalog";
import Inquiries from "./pages/Inquiries";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin-users" element={<AdminUsers />} />
          <Route path="/admin-users/add" element={<AddAdminUser />} />
          <Route path="/admin-users/edit/:id" element={<EditAdminUser />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/add" element={<AddCategory />} />
          <Route path="/categories/edit/:id" element={<EditCategory />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/add" element={<AddCustomer />} />
          <Route path="/catalogs" element={<Catalogs />} />
          <Route path="/catalogs/add" element={<AddCatalog />} />
          <Route path="/catalogs/edit/:id" element={<EditCatalog />} />
          <Route path="/inquiries" element={<Inquiries />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

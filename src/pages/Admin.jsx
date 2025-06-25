import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Package, ClipboardList, Boxes } from "lucide-react";

const Admin = () => {
  const [tab, setTab] = useState("products");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
        <div className="flex space-x-4 mb-8">
          <Button
            variant={tab === "products" ? "default" : "outline"}
            onClick={() => setTab("products")}
          >
            <Package className="h-4 w-4 mr-2" /> Products
          </Button>
          <Button
            variant={tab === "orders" ? "default" : "outline"}
            onClick={() => setTab("orders")}
          >
            <ClipboardList className="h-4 w-4 mr-2" /> Orders
          </Button>
          <Button
            variant={tab === "inventory" ? "default" : "outline"}
            onClick={() => setTab("inventory")}
          >
            <Boxes className="h-4 w-4 mr-2" /> Inventory
          </Button>
        </div>
        {tab === "products" && (
          <Card>
            <CardHeader>
              <CardTitle>Manage Products</CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Add product CRUD UI */}
              <div className="flex items-center space-x-4 mb-4">
                <Input placeholder="Search products..." />
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> Add Product
                </Button>
              </div>
              <div className="text-muted-foreground">
                Product management table goes here.
              </div>
            </CardContent>
          </Card>
        )}
        {tab === "orders" && (
          <Card>
            <CardHeader>
              <CardTitle>View Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Add orders table UI */}
              <div className="text-muted-foreground">
                Orders table goes here.
              </div>
            </CardContent>
          </Card>
        )}
        {tab === "inventory" && (
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Add inventory management UI */}
              <div className="text-muted-foreground">
                Inventory management tools go here.
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Admin;

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Filter,
  Grid,
  List,
  Star,
  ShoppingCart,
  Heart,
  X,
  ChevronDown,
  SlidersHorizontal,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { products, categories, brands } from "@/data/products";
import useProductsStore from "@/features/products/productsStore";
import useCartStore from "@/features/cart/cartStore";
import useWishlistStore from "@/features/wishlist/wishlistStore";
import { useApp } from "@/contexts/AppContext";

// Debounce hook for search
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "name");

  const {
    filters,
    updateFilters,
    getFilteredProducts,
    getUniqueCategories,
    getUniqueBrands,
    getUniqueSizes,
    getUniqueColors,
    getPriceRange,
    loading,
    error,
    fetchProducts,
  } = useProductsStore();

  const { addItem } = useCartStore();
  const { addNotification } = useApp();
  const { toggleItem: toggleWishlistItem, isInWishlist } = useWishlistStore();

  // Filters state
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("brand") || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    searchParams.get("size") || ""
  );
  const [selectedColor, setSelectedColor] = useState(
    searchParams.get("color") || ""
  );
  const [showFilters, setShowFilters] = useState(false);

  // Debounce search query
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Initialize products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle URL params
  useEffect(() => {
    const params = {};
    if (searchQuery) params.search = searchQuery;
    if (selectedCategory) params.category = selectedCategory;
    if (selectedBrand) params.brand = selectedBrand;
    if (selectedSize) params.size = selectedSize;
    if (selectedColor) params.color = selectedColor;
    if (sortBy !== "name") params.sort = sortBy;

    setSearchParams(params);
  }, [
    searchQuery,
    selectedCategory,
    selectedBrand,
    selectedSize,
    selectedColor,
    sortBy,
    setSearchParams,
  ]);

  // Update filters when URL params change
  useEffect(() => {
    updateFilters({
      search: searchQuery,
      category: selectedCategory,
      brand: selectedBrand,
      size: selectedSize,
      color: selectedColor,
      priceRange,
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedBrand,
    selectedSize,
    selectedColor,
    priceRange,
    updateFilters,
  ]);

  const filteredProducts = getFilteredProducts();

  const handleAddToCart = (product, size) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size,
      quantity: 1,
    });
    addNotification("Product added to cart!", "success");
  };

  const handleToggleWishlist = (product) => {
    const inWishlist = isInWishlist(product.id);
    toggleWishlistItem(product);
    addNotification({
      type: "info",
      title: inWishlist ? "Removed from Wishlist" : "Added to Wishlist",
      message: `${product.name} has been ${
        inWishlist ? "removed from" : "added to"
      } your wishlist.`,
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedBrand("");
    setSelectedSize("");
    setSelectedColor("");
    setPriceRange([0, 1000]);
    setSortBy("name");
    setSearchParams({});
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load products. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Shop</h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} products found
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* Mobile Filter Button */}
            <Button
              variant="outline"
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            {/* View Mode Toggle */}
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-lg px-3 py-2 bg-background"
            >
              <option value="name">Sort by Name</option>
              <option value="brand">Sort by Brand</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div
            className={`fixed inset-0 z-50 bg-black/50 md:hidden ${
              isSidebarOpen ? "block" : "hidden"
            }`}
          >
            <div className="absolute right-0 top-0 h-full w-80 bg-background p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <FilterSidebar
                filters={filters}
                categories={categories}
                brands={brands}
                uniqueSizes={getUniqueSizes()}
                uniqueColors={getUniqueColors()}
                priceRange={priceRange}
                priceRangeData={getPriceRange()}
                onFilterChange={(key, value) => updateFilters({ [key]: value })}
                onPriceRangeChange={(min, max) => setPriceRange([min, max])}
                onClearFilters={clearFilters}
              />
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden md:block w-80 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              categories={categories}
              brands={brands}
              uniqueSizes={getUniqueSizes()}
              uniqueColors={getUniqueColors()}
              priceRange={priceRange}
              priceRangeData={getPriceRange()}
              onFilterChange={(key, value) => updateFilters({ [key]: value })}
              onPriceRangeChange={(min, max) => setPriceRange([min, max])}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <ProductCardSkeleton key={index} viewMode={viewMode} />
                ))
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    onAddToCart={(size) => handleAddToCart(product, size)}
                    onToggleWishlist={() => handleToggleWishlist(product)}
                    isWishlisted={isInWishlist(product.id)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h2 className="text-xl font-semibold">No products found</h2>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your filters or clearing them to see all
                    products.
                  </p>
                  <Button onClick={clearFilters} className="mt-4">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Filter Sidebar Component
const FilterSidebar = ({
  filters,
  categories,
  brands,
  uniqueSizes,
  uniqueColors,
  priceRange,
  priceRangeData,
  onFilterChange,
  onPriceRangeChange,
  onClearFilters,
}) => {
  return (
    <aside className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="default" size="sm" onClick={onClearFilters}>
          Clear all
        </Button>
      </div>

      {/* Search */}
      <div>
        <h3 className="font-medium mb-3">Search</h3>
        <Input
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
        />
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-medium mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center space-x-2">
              <input
                type="radio"
                name="category"
                value={category.name}
                checked={filters.category === category.name}
                onChange={(e) => onFilterChange("category", e.target.value)}
                className="rounded"
              />
              <span className="text-sm">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-medium mb-3">Brand</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand.id} className="flex items-center space-x-2">
              <input
                type="radio"
                name="brand"
                value={brand.name}
                checked={filters.brand === brand.name}
                onChange={(e) => onFilterChange("brand", e.target.value)}
                className="rounded"
              />
              <span className="text-sm">{brand.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="font-medium mb-3">Size</h3>
        <div className="grid grid-cols-3 gap-2">
          {uniqueSizes.map((size) => (
            <label key={size} className="flex items-center space-x-2">
              <input
                type="radio"
                name="size"
                value={size}
                checked={filters.size === size}
                onChange={(e) => onFilterChange("size", e.target.value)}
                className="rounded"
              />
              <span className="text-sm">{size}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="font-medium mb-3">Color</h3>
        <div className="space-y-2">
          {uniqueColors.map((color) => (
            <label key={color} className="flex items-center space-x-2">
              <input
                type="radio"
                name="color"
                value={color}
                checked={filters.color === color}
                onChange={(e) => onFilterChange("color", e.target.value)}
                className="rounded"
              />
              <span className="text-sm">{color}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-3">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) =>
                onPriceRangeChange(Number(e.target.value), priceRange[1])
              }
              className="w-20"
            />
            <span>-</span>
            <Input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) =>
                onPriceRangeChange(priceRange[0], Number(e.target.value))
              }
              className="w-20"
            />
          </div>
          <div className="text-xs text-muted-foreground">
            Range: ${priceRangeData.min} - ${priceRangeData.max}
          </div>
        </div>
      </div>
    </aside>
  );
};

// Product Card Component
const ProductCard = ({
  product,
  viewMode,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  return (
    <Card
      className={`group hover:shadow-lg transition-all ${
        viewMode === "list" ? "flex" : ""
      }`}
    >
      <CardHeader className={`p-0 ${viewMode === "list" ? "w-1/3" : ""}`}>
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              viewMode === "list" ? "h-48" : "h-64"
            }`}
          />
          {product.originalPrice > product.price && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )}
              % OFF
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              onToggleWishlist();
            }}
            className="absolute top-2 right-2 h-8 w-8 bg-background/50 rounded-full text-muted-foreground hover:text-destructive"
          >
            <Heart
              className={`h-5 w-5 ${
                isWishlisted ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent className={`p-6 ${viewMode === "list" ? "w-2/3" : ""}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">{product.brand}</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm ml-1">{product.rating}</span>
            <span className="text-sm text-muted-foreground ml-1">
              ({product.reviews})
            </span>
          </div>
        </div>
        <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link to={`/product/${product.id}`}>View Details</Link>
          </Button>
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(product.sizes[0]);
            }}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ProductCardSkeleton = ({ viewMode }) => (
  <Card
    className={`group hover:shadow-lg transition-all ${
      viewMode === "list" ? "flex" : ""
    }`}
  >
    <CardHeader className={`p-0 ${viewMode === "list" ? "w-1/3" : ""}`}>
      <div className="relative overflow-hidden rounded-t-lg">
        <div
          className={`w-full bg-muted animate-pulse ${
            viewMode === "list" ? "h-48" : "h-64"
          }`}
        />
      </div>
    </CardHeader>
    <CardContent className={`p-6 ${viewMode === "list" ? "w-2/3" : ""}`}>
      <div className="h-4 bg-muted rounded w-2/4 mb-2 animate-pulse"></div>
      <div className="h-6 bg-muted rounded w-3/4 mb-4 animate-pulse"></div>
      <div className="h-4 bg-muted rounded w-full mb-4 animate-pulse"></div>
      <div className="flex items-center justify-between">
        <div className="h-8 bg-muted rounded w-1/4 animate-pulse"></div>
        <div className="h-8 bg-muted rounded w-1/3 animate-pulse"></div>
      </div>
    </CardContent>
  </Card>
);

export default Shop;

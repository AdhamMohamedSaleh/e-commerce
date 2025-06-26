import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import useWishlistStore from "@/features/wishlist/wishlistStore";
import { AppContext } from "@/contexts/AppContext";

const Profile = () => {
  const { user } = useContext(AppContext);
  const { items: wishlist, removeItem } = useWishlistStore();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            {user ? (
              <div>
                <div className="mb-2">
                  <span className="font-semibold">Name:</span> {user.name}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Email:</span> {user.email}
                </div>
                {/* Add more user info fields as needed */}
                <Button variant="outline" className="mt-4" disabled>
                  Edit Profile (Coming Soon)
                </Button>
              </div>
            ) : (
              <div>
                <p className="mb-4">You are not logged in.</p>
                <Button asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Favourites</CardTitle>
          </CardHeader>
          <CardContent>
            {wishlist.length === 0 ? (
              <p className="text-muted-foreground">Your wishlist is empty.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border rounded-lg p-3"
                  >
                    <Link
                      to={`/product/${item.id}`}
                      className="flex-1 flex items-center gap-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.brand}
                        </div>
                        <div className="text-sm font-bold">${item.price}</div>
                      </div>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <Button asChild variant="outline" className="mt-4">
              <Link to="/wishlist">View Full Wishlist</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Order history coming soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;

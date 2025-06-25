import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center py-16">
    <AlertTriangle className="h-16 w-16 text-primary mb-6" />
    <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
    <p className="text-muted-foreground mb-8">
      Sorry, the page you are looking for does not exist or is under
      construction.
      <br />
      Please check the URL or return to the homepage.
    </p>
    <Button asChild size="lg">
      <Link to="/">Go to Home</Link>
    </Button>
  </div>
);

export default NotFound;

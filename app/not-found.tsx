import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <span className="text-8xl">🙈</span>
          </div>
          <CardTitle className="text-3xl font-bold text-center">
            Oops! Page Not Found
          </CardTitle>
          <CardDescription className="text-center">
            It seems you've wandered into uncharted territory!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            The page you're looking for doesn't exist or has been moved to a new
            address.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">Take Me Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

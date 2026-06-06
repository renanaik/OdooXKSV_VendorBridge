import Link from "next/link";
import { Package2, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline text-primary hover:text-primary/80"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" className="rounded border-gray-300 text-primary focus:ring-primary" />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            
            <Link href="/dashboard" className="w-full">
              <Button type="button" className="w-full mt-2">
                Login
              </Button>
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline text-primary">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      
      <div className="hidden bg-muted lg:block relative">
        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 z-0"></div>
        <div className="flex flex-col justify-center h-full p-16 relative z-10">
          <div className="flex items-center gap-2 mb-12">
             <Package2 className="h-8 w-8 text-primary" />
             <span className="text-2xl font-bold text-primary">VendorBridge</span>
          </div>
          
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            Next-Generation Procurement & Vendor Management
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-lg">
            Digitize your complete procurement lifecycle from RFQ creation to invoice processing and vendor performance analytics.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
               <CheckCircle2 className="h-6 w-6 text-primary mt-1" />
               <div>
                  <h3 className="font-semibold text-lg">AI-Powered Quotation Comparison</h3>
                  <p className="text-muted-foreground">Automatically evaluate and score vendors based on price, delivery, and risk factors.</p>
               </div>
            </div>
            <div className="flex items-start gap-4">
               <CheckCircle2 className="h-6 w-6 text-primary mt-1" />
               <div>
                  <h3 className="font-semibold text-lg">Enterprise Approval Pipelines</h3>
                  <p className="text-muted-foreground">Multi-tier workflows ensuring compliance and financial oversight.</p>
               </div>
            </div>
            <div className="flex items-start gap-4">
               <CheckCircle2 className="h-6 w-6 text-primary mt-1" />
               <div>
                  <h3 className="font-semibold text-lg">Real-Time Analytics</h3>
                  <p className="text-muted-foreground">Actionable insights into spend categories, savings, and vendor fulfillment.</p>
               </div>
            </div>
          </div>
          
          <div className="mt-16 flex items-center gap-4 border border-border bg-background/50 backdrop-blur rounded-xl p-4 w-max shadow-sm">
            <div className="flex -space-x-3">
               {[1,2,3,4].map(i => (
                 <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-accent/20 flex items-center justify-center">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" className="rounded-full h-full w-full object-cover" />
                 </div>
               ))}
            </div>
            <div className="text-sm font-medium">
               Join 500+ enterprises today <ArrowRight className="inline ml-1 h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Package2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RegisterPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="w-full max-w-lg space-y-8">
          <div>
            <div className="flex items-center justify-center gap-2 mb-6">
               <Package2 className="h-8 w-8 text-primary" />
               <span className="text-2xl font-bold text-primary">VendorBridge</span>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Or{" "}
              <Link href="/login" className="font-medium text-primary hover:text-primary/80">
                sign in to your existing account
              </Link>
            </p>
          </div>
          
          <form className="mt-8 space-y-6" action="/dashboard">
            <div className="flex flex-col items-center justify-center mb-6">
               <div className="h-24 w-24 rounded-full bg-accent/20 border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-accent/30 transition-colors">
                  <Upload className="h-6 w-6 mb-1" />
                  <span className="text-xs">Photo</span>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="text-sm font-medium mb-1 block">First Name</label>
                 <Input required placeholder="John" />
               </div>
               <div>
                 <label className="text-sm font-medium mb-1 block">Last Name</label>
                 <Input required placeholder="Doe" />
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="text-sm font-medium mb-1 block">Email</label>
                 <Input required type="email" placeholder="john@example.com" />
               </div>
               <div>
                 <label className="text-sm font-medium mb-1 block">Phone</label>
                 <Input required type="tel" placeholder="+91 98765 43210" />
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="text-sm font-medium mb-1 block">Country</label>
                 <Select defaultValue="in">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in">India</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ae">UAE</SelectItem>
                    </SelectContent>
                 </Select>
               </div>
               <div>
                 <label className="text-sm font-medium mb-1 block">Role</label>
                 <Select defaultValue="vendor">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="officer">Procurement Officer</SelectItem>
                      <SelectItem value="manager">Approver / Manager</SelectItem>
                      <SelectItem value="vendor">Vendor</SelectItem>
                    </SelectContent>
                 </Select>
               </div>
            </div>
            
            <div>
               <label className="text-sm font-medium mb-1 block">Department (Optional)</label>
               <Input placeholder="e.g. IT, Operations, Finance" />
            </div>
            
            <div>
               <label className="text-sm font-medium mb-1 block">Additional Notes</label>
               <Textarea placeholder="Any other details..." className="resize-none" />
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
        </div>
      </div>
      
      <div className="hidden bg-muted lg:block relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        <div className="absolute bottom-16 left-16 right-16 z-10">
           <blockquote className="text-2xl font-medium italic text-foreground border-l-4 border-primary pl-6 py-2">
              "VendorBridge transformed our procurement process. We reduced our sourcing cycle time by 40% and improved vendor compliance across all our Indian operations."
           </blockquote>
           <div className="mt-6 flex items-center gap-4">
              <img src="https://i.pravatar.cc/100?img=68" alt="CEO" className="h-12 w-12 rounded-full border border-border" />
              <div>
                 <div className="font-semibold">Rajesh Sharma</div>
                 <div className="text-sm text-muted-foreground">Chief Procurement Officer, TechCorp India</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

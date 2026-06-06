"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package2, Upload, Loader2 } from "lucide-react";
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
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "Vendor",
    department: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value: string | null) => {
    if (value) {
      setFormData({ ...formData, role: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone,
        department: formData.department,
      };

      await api.post('/auth/register', payload);
      toast({ title: "Success", description: "Registration successful. Please log in." });
      router.push('/login');
    } catch (err: any) {
      toast({ 
        title: "Registration Failed", 
        description: err.response?.data?.message || "An error occurred", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

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
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="text-sm font-medium mb-1 block">First Name</label>
                 <Input name="firstName" required placeholder="John" value={formData.firstName} onChange={handleChange} />
               </div>
               <div>
                 <label className="text-sm font-medium mb-1 block">Last Name</label>
                 <Input name="lastName" required placeholder="Doe" value={formData.lastName} onChange={handleChange} />
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="text-sm font-medium mb-1 block">Email</label>
                 <Input name="email" required type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} />
               </div>
               <div>
                 <label className="text-sm font-medium mb-1 block">Phone</label>
                 <Input name="phone" required type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} />
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="text-sm font-medium mb-1 block">Password</label>
                 <Input name="password" required type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} minLength={6} />
               </div>
               <div>
                 <label className="text-sm font-medium mb-1 block">Confirm Password</label>
                 <Input name="confirmPassword" required type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} minLength={6} />
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="text-sm font-medium mb-1 block">Role</label>
                 <Select value={formData.role} onValueChange={handleRoleChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Administrator</SelectItem>
                      <SelectItem value="Procurement Officer">Procurement Officer</SelectItem>
                      <SelectItem value="Manager">Approver / Manager</SelectItem>
                      <SelectItem value="Vendor">Vendor</SelectItem>
                    </SelectContent>
                 </Select>
               </div>
               <div>
                 <label className="text-sm font-medium mb-1 block">Department (Optional)</label>
                 <Input name="department" placeholder="e.g. IT, Operations" value={formData.department} onChange={handleChange} />
               </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
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

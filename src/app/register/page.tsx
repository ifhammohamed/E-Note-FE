"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    retypePassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      //   className="min-h-screen p-6 bg-background"
    >
      <Link href="/login" className="flex items-center text-purple-600 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Login
      </Link>

      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Register</h1>
          <p className="text-muted-foreground">And start taking notes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input
              type="text"
              placeholder="Example: John Doe"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <Input
              type="email"
              placeholder="Example: johndoe@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Retype Password</label>
            <Input
              type="password"
              value={formData.retypePassword}
              onChange={(e) =>
                setFormData({ ...formData, retypePassword: e.target.value })
              }
              required
            />
          </div>

          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            Register
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </div>
    </motion.div>
  );
}

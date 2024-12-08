"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      //   className="min-h-screen p-6 bg-background"
    >
      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Let's Login</h1>
          <p className="text-muted-foreground">And notes your idea</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <Input
              type="email"
              placeholder="Example: johndoe@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Link
            href="/forgot-password"
            className="block text-sm text-purple-600"
          >
            Forgot Password
          </Link>

          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            Login
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" />
            Login with Google
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don't have any account?{" "}
            <Link href="/register" className="text-purple-600">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
}

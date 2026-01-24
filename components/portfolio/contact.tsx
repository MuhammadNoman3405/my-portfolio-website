"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/MuhammadNoman3405",
    icon: Github,
    username: "@MuhammadNoman3405",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammad-noman-a219712b0",
    icon: Linkedin,
    username: "Muhammad Noman",
  },
  {
    name: "Email",
    href: "mailto:23-cs-68@students.uettaxila.edu.pk",
    icon: Mail,
    username: "23-cs-68@students.uettaxila.edu.pk",
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.warning) {
          toast.warning(data.warning);
          setStatus("success"); // Still success because message is saved
        } else {
          toast.success("Message sent successfully!");
          setStatus("success");
        }

        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id="contact" className="py-12 sm:py-20 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-12">
          <p className="text-primary font-mono text-sm tracking-wider uppercase">
            Get in Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            {"Let's Connect"}
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            {"I'm always open to discussing new projects, opportunities, or just having a chat about data science and machine learning."}
          </p>
        </div>

        {/* Contact Form */}
        <ScrollAnimation delay={200}>
          <div className="max-w-2xl mx-auto mb-12">
            <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded-lg border border-border">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  placeholder="Your message..."
                  className="min-h-[120px]"
                />
              </div>
              {status === "success" && (
                <p className="text-sm text-primary">Message sent successfully! I'll get back to you soon.</p>
              )}
              {status === "error" && (
                <p className="text-sm text-destructive">Failed to send message. Please try again.</p>
              )}
              <Button type="submit" disabled={loading} className="w-full">
                <Send className="w-4 h-4 mr-2" />
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </ScrollAnimation>

        {/* Social Links */}
        <ScrollAnimation delay={400}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 px-6 py-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all group w-full"
              >
                <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                <div className="text-left min-w-0">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {link.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{link.username}</p>
                </div>
              </a>
            ))}
          </div>
        </ScrollAnimation>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-sm text-primary font-medium">
              Made by Muhammad Noman 23-CS-068
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

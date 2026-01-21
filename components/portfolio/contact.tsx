import { Github, Linkedin, Mail } from "lucide-react";

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
  return (
    <footer id="contact" className="py-20 bg-secondary/30">
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

        {/* Social Links */}
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

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Muhammad Noman. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

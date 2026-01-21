"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Skill {
  name: string;
  level: string; // Changed to string to match DB
  category: string; // Changed to string to match DB
}

const staticSkills: Skill[] = [
  { name: "Python", level: "Expert", category: "language" },
  { name: "SQL", level: "Advanced", category: "language" },
  { name: "C++", level: "Intermediate", category: "language" },
  { name: "Pandas", level: "Expert", category: "framework" },
  { name: "Scikit-learn", level: "Advanced", category: "framework" },
  { name: "Streamlit", level: "Advanced", category: "framework" },
  { name: "Git", level: "Advanced", category: "tool" },
  { name: "XAMPP", level: "Intermediate", category: "tool" },
  { name: "NumPy", level: "Expert", category: "framework" },
  { name: "Matplotlib", level: "Advanced", category: "framework" },
  { name: "TensorFlow", level: "Intermediate", category: "framework" },
  { name: "Jupyter", level: "Expert", category: "tool" },
];

const categories = [
  { id: "all", label: "All" },
  { id: "language", label: "Languages" },
  { id: "framework", label: "Frameworks" },
  { id: "tool", label: "Tools" },
];

export function Skills({ initialSkills = [] }: { initialSkills?: Skill[] }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const skillsToDisplay = initialSkills.length > 0 ? initialSkills : staticSkills;

  const filteredSkills =
    activeCategory === "all"
      ? skillsToDisplay
      : skillsToDisplay.filter((skill) => skill.category === activeCategory);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "bg-primary text-primary-foreground";
      case "Advanced":
        return "bg-primary/70 text-primary-foreground";
      default:
        return "bg-primary/40 text-primary-foreground";
    }
  };

  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-2 mb-12">
          <p className="text-primary font-mono text-sm tracking-wider uppercase">
            Technical Expertise
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Skills & Technologies
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === category.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => (
            <Card
              key={skill.name}
              className="bg-card border-border hover:border-primary/50 transition-all group"
            >
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {skill.name}
                </h3>
                <Badge className={getLevelColor(skill.level)}>
                  {skill.level}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tech Stack Pills */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Quick Overview
          </h3>
          <div className="flex flex-wrap gap-2">
            {skillsToDisplay.map((skill) => (
              <span
                key={skill.name}
                className="px-3 py-1 rounded-full text-sm font-medium bg-secondary text-secondary-foreground border border-border hover:border-primary/50 transition-colors cursor-default"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

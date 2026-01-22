"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

export interface Project {
  id?: string
  title: string;
  description: string;
  techStack: string[];
  category: string;
  githubUrl: string | null;
  liveUrl?: string | null;
}

const staticProjects: Project[] = [
  {
    id: "1",
    title: "Customer Churn Prediction",
    description:
      "Built a machine learning model to predict customer churn using Random Forest and XGBoost. Achieved 92% accuracy with feature engineering and hyperparameter tuning.",
    techStack: ["Python", "Scikit-learn", "Pandas", "Streamlit"],
    category: "ml",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Sales Dashboard Analytics",
    description:
      "Interactive data visualization dashboard for analyzing sales trends and patterns. Features real-time filtering and drill-down capabilities.",
    techStack: ["Python", "Plotly", "Dash", "SQL"],
    category: "data",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Sentiment Analysis API",
    description:
      "REST API for analyzing sentiment in text using NLP techniques. Deployed as a scalable microservice with FastAPI and Docker.",
    techStack: ["Python", "FastAPI", "NLTK", "Docker"],
    category: "ml",
    githubUrl: "https://github.com",
  },
  {
    title: "Inventory Management System",
    description:
      "Full-stack web application for managing inventory with real-time stock tracking and automated reorder alerts.",
    techStack: ["PHP", "MySQL", "JavaScript", "XAMPP"],
    category: "web",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Image Classification Model",
    description:
      "Deep learning model for classifying images using CNN architecture. Trained on custom dataset with data augmentation techniques.",
    techStack: ["Python", "TensorFlow", "Keras", "NumPy"],
    category: "ml",
    githubUrl: "https://github.com",
  },
  {
    title: "Data Pipeline Automation",
    description:
      "Automated ETL pipeline for processing and transforming large datasets. Includes data validation and quality checks.",
    techStack: ["Python", "Pandas", "Airflow", "PostgreSQL"],
    category: "data",
    githubUrl: "https://github.com",
  },
];

const filters = [
  { id: "all", label: "All" },
  { id: "ml", label: "Machine Learning" },
  { id: "web", label: "Web Dev" },
  { id: "data", label: "Data Analysis" },
  { id: "semester", label: "Semester Projects" },
];

export function Projects({ initialProjects = [] }: { initialProjects?: Project[] }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const projectsToDisplay = initialProjects.length > 0 ? initialProjects : staticProjects;

  const filteredProjects =
    activeFilter === "all"
      ? projectsToDisplay
      : projectsToDisplay.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" className="py-12 sm:py-20 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-2 mb-12">
          <p className="text-primary font-mono text-sm tracking-wider uppercase">
            Featured Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Projects
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeFilter === filter.id
                ? "bg-primary text-primary-foreground"
                : "bg-background text-foreground hover:bg-primary/10 border border-primary/50"
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.title}
              className="bg-card border-border hover:border-primary/50 transition-all group"
            >
              <CardHeader>
                <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-secondary text-secondary-foreground"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="gap-2 bg-transparent"
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </a>
                  </Button>
                  {project.liveUrl && (
                    <Button size="sm" asChild className="gap-2">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

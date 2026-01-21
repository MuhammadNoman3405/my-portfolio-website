"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, Trash2, Download } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResumeAdminPage() {
    const [resume, setResume] = useState<{ filename: string } | null>(null);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchResumeInfo();
    }, []);

    async function fetchResumeInfo() {
        try {
            const response = await fetch("/api/resume/info");
            if (response.ok) {
                const data = await response.json();
                setResume(data);
            } else {
                setResume(null);
            }
        } catch (error) {
            console.error("Error fetching resume info:", error);
            setResume(null);
        } finally {
            setLoading(false);
        }
    }

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== "application/pdf") {
            alert("Please upload a PDF file");
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/resume", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                await fetchResumeInfo();
                alert("Resume uploaded successfully!");
            } else {
                const error = await response.json();
                alert(error.error || "Failed to upload resume");
            }
        } catch (error) {
            console.error("Error uploading resume:", error);
            alert("Failed to upload resume");
        } finally {
            setUploading(false);
        }
    }

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete the resume?")) return;

        try {
            const response = await fetch("/api/resume", {
                method: "DELETE",
            });

            if (response.ok) {
                setResume(null);
                alert("Resume deleted successfully!");
            } else {
                alert("Failed to delete resume");
            }
        } catch (error) {
            console.error("Error deleting resume:", error);
            alert("Failed to delete resume");
        }
    }

    function handleDownload() {
        window.open("/api/resume", "_blank");
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Resume Management</h1>
                    <p className="text-muted-foreground mt-2">
                        Upload and manage your resume PDF
                    </p>
                </div>
                <Button variant="outline" onClick={() => router.push("/admin")}>
                    Back to Dashboard
                </Button>
            </div>

            <Card className="p-6">
                {loading ? (
                    <p className="text-center text-muted-foreground">Loading...</p>
                ) : resume ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
                            <FileText className="w-8 h-8 text-primary" />
                            <div className="flex-1">
                                <p className="font-medium">{resume.filename}</p>
                                <p className="text-sm text-muted-foreground">Current resume</p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleDownload}
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={handleDelete}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                </Button>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <label htmlFor="resume-upload">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    disabled={uploading}
                                    onClick={() => document.getElementById("resume-upload")?.click()}
                                >
                                    <Upload className="w-4 h-4 mr-2" />
                                    {uploading ? "Uploading..." : "Replace Resume"}
                                </Button>
                            </label>
                            <input
                                id="resume-upload"
                                type="file"
                                accept=".pdf"
                                className="hidden"
                                onChange={handleUpload}
                                disabled={uploading}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No resume uploaded</h3>
                        <p className="text-muted-foreground mb-6">
                            Upload your resume PDF to make it available for download
                        </p>
                        <label htmlFor="resume-upload">
                            <Button disabled={uploading} onClick={() => document.getElementById("resume-upload")?.click()}>
                                <Upload className="w-4 h-4 mr-2" />
                                {uploading ? "Uploading..." : "Upload Resume"}
                            </Button>
                        </label>
                        <input
                            id="resume-upload"
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                    </div>
                )}
            </Card>
        </div>
    );
}

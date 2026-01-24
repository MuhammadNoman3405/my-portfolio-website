"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
    value?: string;
    onChange: (value: string) => void;
    label?: string;
    maxSizeMB?: number;
}

export function ImageUpload({
    value,
    onChange,
    label = "Upload Image",
    maxSizeMB = 2,
}: ImageUploadProps) {
    const [preview, setPreview] = useState<string | undefined>(value);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            toast.error("Please upload an image file");
            return;
        }

        // Validate file size
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        if (file.size > maxSizeBytes) {
            toast.error(`Image size should be less than ${maxSizeMB}MB`);
            return;
        }

        setLoading(true);

        try {
            // Convert to base64
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setPreview(base64String);
                onChange(base64String);
                setLoading(false);
                toast.success("Image uploaded successfully");
            };
            reader.onerror = () => {
                toast.error("Failed to read image");
                setLoading(false);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            toast.error("Failed to upload image");
            setLoading(false);
        }
    };

    const handleRemove = () => {
        setPreview(undefined);
        onChange("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        toast.success("Image removed");
    };

    return (
        <div className="space-y-2">
            <Label>{label}</Label>

            <div className="flex flex-col gap-4">
                {preview ? (
                    <div className="relative w-full max-w-sm">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg border border-border"
                        />
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={handleRemove}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="w-full max-w-sm h-48 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary/50 transition-colors">
                        <ImageIcon className="w-12 h-12" />
                        <p className="text-sm">No image uploaded</p>
                    </div>
                )}

                <div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="image-upload"
                    />
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={loading}
                        className="gap-2"
                    >
                        <Upload className="w-4 h-4" />
                        {loading ? "Uploading..." : preview ? "Change Image" : "Upload Image"}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                        Max size: {maxSizeMB}MB. Supported formats: JPG, PNG, GIF, WebP
                    </p>
                </div>
            </div>
        </div>
    );
}

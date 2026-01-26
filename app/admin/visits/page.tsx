
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MapPin, Monitor, Smartphone, Tablet } from "lucide-react";

export default async function VisitsPage() {
    const visits = await prisma.visit.findMany({
        orderBy: { createdAt: "desc" },
        take: 100, // Limit to last 100 visits
    });

    const getDeviceIcon = (device: string | null) => {
        switch (device) {
            case "Mobile":
                return <Smartphone className="w-4 h-4" />;
            case "Tablet":
                return <Tablet className="w-4 h-4" />;
            default:
                return <Monitor className="w-4 h-4" />;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Visitor Log</h1>
                <p className="text-muted-foreground">
                    Detailed log of recent visitors to your portfolio
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Visits</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Time</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Device</TableHead>
                                <TableHead>Path</TableHead>
                                <TableHead>IP Address</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {visits.map((visit) => (
                                <TableRow key={visit.id}>
                                    <TableCell className="font-medium">
                                        {new Date(visit.createdAt).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-muted-foreground" />
                                            <span>
                                                {visit.city && visit.country
                                                    ? `${visit.city}, ${visit.country}`
                                                    : "Unknown"}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {getDeviceIcon(visit.device)}
                                            <span>{visit.device || "Desktop"}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{visit.path}</Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-xs">
                                        {visit.ip?.startsWith("::") ? "Localhost" : visit.ip}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {visits.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                        No visits recorded yet
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

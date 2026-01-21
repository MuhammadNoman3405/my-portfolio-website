
import { CertificationForm } from "@/components/admin/certification-form"

export default function NewCertificationPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">New Certification</h1>
                <p className="text-muted-foreground">Add a new certification to your portfolio.</p>
            </div>
            <CertificationForm />
        </div>
    )
}

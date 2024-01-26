import DetailsPurchasePackage from "@/components/purchase-pacakge/details/DetailsPurchasePackage";


export default function PurchasePackageAdminDetails({ params }: { params: { id: string } }) {
    return (<div>
        <DetailsPurchasePackage purchaseId={params?.id} />
    </div>)
}

import DetailsPurchasePackage from "@/components/purchase-course/details/DetailsCoursePackage";


export default function PurchasePackageAdminDetails({ params }: { params: { id: string } }) {
    return (<div>
        <DetailsPurchasePackage purchaseId={params?.id} />
    </div>)
}

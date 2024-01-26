import DetailsPurchaseCourse from "@/components/purchase-course/details/DetailsCoursePackage";



export default function PurchaseCourseAdminDetails({ params }: { params: { id: string } }) {
    return (<div>
        <DetailsPurchaseCourse purchaseId={params?.id} />
    </div>)
}

import DonateNowButton from '@/app/(dashboard)/admin/donation/DonateNowButton';
import { USER_ROLE } from '@/constants/role';
import { useAddStripeCoursePaymentMutation } from '@/redux/api/public/paymentApi';
import { useGetCheckPurchasesCourseQuery } from '@/redux/api/public/purchaseCourseApi';
import { Error_model_hook } from '@/utils/modalHook';
import { Button, Skeleton } from 'antd';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '../../ContextApi/GlobalContextApi';

export default function StripeCheckoutByCourse({ courseData }: any) {
  const { userInfo, userInfoLoading } = useGlobalContext();
  const router = useRouter();
  const [
    createStripePaymentByCourse,
    { isLoading: sPaymentLoading, error: PaypalPaymentError },
  ] = useAddStripeCoursePaymentMutation();

  const { data, isLoading } = useGetCheckPurchasesCourseQuery(
    {
      user: userInfo?.id,
      course: courseData?._id,
    },
    {
      skip: !Boolean(userInfo?.id),
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );

  const makePayment = async (platform?: string) => {
    if (!userInfo?.id) {
      window.open('/login', '_blank');
      return;
    }
    //@ts-ignore
    if (!courseData?._id) {
      Error_model_hook('Please select any Course');
      return;
    }
    try {
      const res = await createStripePaymentByCourse({
        products: [
          {
            // "name": "sampod",
            // "img": "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            // "price": 120,
            // "quantity": 1,
            courseId: courseData?._id,
          },
        ],
      }).unwrap();

      if (res?.url) {
        router.push(res.url as string);
      }
    } catch (error: any) {
      console.log('🚀 ~ makePayment ~ error:', error);
      Error_model_hook(error?.message || 'Something is wrong');
    }
  };
  return (
    <div
      className={`${userInfo?.role === USER_ROLE.SELLER ? 'hidden' : 'block'}`}
    >
      {isLoading ? (
        <Skeleton />
      ) : data?.data?.length ? (
        <p className="my-3 bg-slate-200 p-5 text-center text-sm text-red-600 md:text-lg">
          You have already purchased this course
        </p>
      ) : (
        <div className="flex items-center justify-center">
          <Button
            loading={sPaymentLoading}
            onClick={() => makePayment('paypal')}
            type="default"
            htmlType="submit"
            className="mt-4 w-fit !border-none bg-transparent shadow-none"
          >
            <DonateNowButton text={'Pay by Card'} />
          </Button>
        </div>
      )}
    </div>
  );
}

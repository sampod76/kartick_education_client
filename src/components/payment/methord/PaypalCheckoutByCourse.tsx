import { USER_ROLE } from '@/constants/role';
import { useAddPaypalPaymentByCourseMutation } from '@/redux/api/public/paymentApi';
import { useGetCheckPurchasesCourseQuery } from '@/redux/api/public/purchaseCourseApi';
import { Error_model_hook } from '@/utils/modalHook';
import { Button } from 'antd';
import { useGlobalContext } from '../../ContextApi/GlobalContextApi';
import ButtonLoading from '../../ui/Loading/ButtonLoading';

export default function PaypalCheckoutByCourse({ courseData }: any) {
  const { userInfo, userInfoLoading } = useGlobalContext();
  console.log('🚀 ~ PaypalCheckoutByCourse ~ userInfo:', userInfo);
  const [
    createPaypalPaymentByCourse,
    { isLoading: PaypalPaymentLoading, error: PaypalPaymentError },
  ] = useAddPaypalPaymentByCourseMutation();

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
      const resultPaypal = await createPaypalPaymentByCourse({
        item_list: {
          items: [
            {
              name: courseData?.title,
              sku: courseData?._id,
            },
          ],
        },
        data: {
          courseId: courseData?._id,
        },
      }).unwrap();

      if (resultPaypal?.url) {
        window.open(resultPaypal?.url, '_blank');
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
      {PaypalPaymentLoading || isLoading ? (
        <Button
          type="default"
          style={{
            padding: '1rem',
            width: '3rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ButtonLoading />
        </Button>
      ) : data?.data?.length ? (
        <p className="my-3 bg-slate-200 p-5 text-center text-sm text-red-600 md:text-lg">
          You have already purchased this course
        </p>
      ) : (
        <button
          onClick={() => makePayment('paypal')}
          className="mt-5 rounded bg-[#5371FF] p-3 text-lg font-bold uppercase text-white lg:text-xl"
        >
          Place Order
        </button>
      )}
    </div>
  );
}

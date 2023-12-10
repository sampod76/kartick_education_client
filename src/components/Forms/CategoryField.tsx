import { useGetAllCategoryQuery } from "@/redux/api/categoryApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";

type CategoryFormField = {
  name: string;
  label?: string;
};

const CategoryField = ({ name, label }: CategoryFormField) => {
  const { data, isLoading } = useGetAllCategoryQuery({
    limit: 100,
    page: 1,
  });
  const categoryData = data?.data;
  const categoryDataOption = categoryData?.map((acDepartment: any) => {
    console.log(acDepartment?.id);
    return {
      label: acDepartment?.title,
      value: acDepartment?.id,
    };
  });


  return (
    <FormSelectField
      name={name}
      label={label}
      options={categoryDataOption as SelectOptions[]}
    />
  );
};

export default CategoryField;

import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import LabelUi from "../ui/dashboardUI/LabelUi";

type TextAreaProps = {
  name: string;
  label?: string;
  rows?: number;
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
};

const FormTextArea = ({
  name,
  label,
  rows,
  value,
  placeholder,
  readOnly = false,
  required,
}: TextAreaProps) => {
  const { control } = useFormContext();
  return (
    <div className={`flex flex-col  w-full font-[500] text-[16px]`}>
      {label ? (
        <LabelUi>
          {label}
          {required && <span className="text-red-400"> *</span>}
        </LabelUi>
      ) : null}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input.TextArea
            style={{
              minHeight: "5rem",
            }}
            rows={rows}
            placeholder={placeholder}
            readOnly={readOnly}
            {...field}
            defaultValue={value}
          />
        )}
      />
    </div>
  );
};

export default FormTextArea;

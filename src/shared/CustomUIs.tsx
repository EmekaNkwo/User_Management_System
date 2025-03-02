import { Image, Upload } from "antd";
import { useState } from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  type?: "text" | "email" | "number" | "date" | "file";
  errors?: FieldError;
  placeholder?: string;
  className?: string;
}

interface FormSelectOption {
  value: string;
  label: string;
}

interface FormSelectProps<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldError;
  className?: string;
  options: FormSelectOption[];
  placeholder?: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outline";
  fullWidth?: boolean;
  disabled?: boolean;
}

interface ImageUploadProps {
  name: string;
  control: Control<any>;
  setValue: (name: string, value: string | null) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  name,
  control,
  setValue,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleUpload = (
    file: File,
    onChange: (value: string | null) => void
  ) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(",")[1];
      setImagePreview(reader.result as string);
      onChange(base64String);
    };
    reader.readAsDataURL(file);
    return false; // Prevent default upload behavior
  };

  const handleRemove = (onChange: (value: null) => void) => {
    setImagePreview(null);
    onChange(null);
    setValue(name, null);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      rules={{ required: "Image is required" }}
      render={({ field }) => (
        <>
          {imagePreview || field.value ? (
            <div className="flex items-center gap-4 mt-2">
              <Image
                preview={false}
                src={
                  imagePreview
                    ? imagePreview
                    : `data:image/jpeg;base64,${field.value}`
                }
                alt="Preview"
                width={100}
                height={100}
                className="rounded-full object-cover border"
              />
              <div className="flex flex-col gap-2">
                <Upload
                  accept="image/*"
                  showUploadList={false}
                  beforeUpload={(file) => handleUpload(file, field.onChange)}
                >
                  <span className="cursor-pointer p-3 rounded-sm bg-[#F3F5F6] ">
                    Change Image
                  </span>
                </Upload>
                {field.value && imagePreview && (
                  <span
                    className="cursor-pointer text-red-600 mt-2"
                    onClick={() => handleRemove(field.onChange)}
                  >
                    Remove
                  </span>
                )}
              </div>
            </div>
          ) : (
            <Upload
              accept="image/*"
              showUploadList={false}
              beforeUpload={(file) => handleUpload(file, field.onChange)}
            >
              <span className="cursor-pointer p-3 rounded-sm bg-[#F3F5F6] ">
                Upload Image
              </span>
            </Upload>
          )}
        </>
      )}
    />
  );
};

export function FormInput<T extends FieldValues>({
  label,
  name,
  register,
  type,
  errors,
  placeholder,
  className,
}: FormInputProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-xs font-medium">
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        {...register(name)}
        placeholder={placeholder}
        className={`w-full p-3 text-[0.9rem] rounded-sm focus:outline-none focus:ring-1 bg-[#F3F5F6] ${
          errors && "border-red-500 border focus:border-red-500"
        } ${className}`}
      />
      {errors && (
        <span className="text-red-500 mt-1 text-xs">{errors.message}</span>
      )}
    </div>
  );
}
export function FormSelect<T extends FieldValues>({
  label,
  name,
  register,
  errors,
  className,
  options,
  placeholder,
}: FormSelectProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-xs font-medium">
          {label}
        </label>
      )}
      <select
        id={name}
        {...register(name)}
        className={`w-full p-3 text-[0.9rem] rounded-sm focus:outline-none focus:ring-1 bg-[#F3F5F6] ${
          errors && "border-red-500 border focus:border-red-500"
        } ${className}`}
      >
        {placeholder && (
          <option value="" disabled selected>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && (
        <span className="text-red-500 mt-1 text-xs">{errors.message}</span>
      )}
    </div>
  );
}

export const CustomButton: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "filled",
  fullWidth = false,
  disabled = false,
  ...props
}) => {
  const variantClasses = {
    filled: "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer",
    outline:
      "border border-blue-500 text-blue-500 hover:bg-blue-50 cursor-pointer",
  };

  const disabledClasses = {
    filled: "bg-gray-300 text-gray-500 cursor-not-allowed",
    outline: "border border-gray-300 text-gray-400 cursor-not-allowed",
  };

  return (
    <button
      type="submit"
      disabled={disabled}
      className={`
        px-4 py-2 
        rounded 
        transition-colors 
        duration-200 
        ${disabled ? disabledClasses[variant] : variantClasses[variant]} 
        ${fullWidth ? "w-full" : ""} 
        ${className || ""}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserContactFormData,
  userContactSchema,
} from "@/utils/validations/zodSchema";
import { useAppSelector } from "@/redux/hooks";
import { selectStepState } from "@/redux/slices/stepSlice";
import { useEffect } from "react";
export const useStepTwo = () => {
  const userData = useAppSelector(selectStepState);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<UserContactFormData>({
    resolver: zodResolver(userContactSchema),
    mode: "onChange",
    defaultValues: {
      fax: "",
    },
  });

  useEffect(() => {
    if (userData?.stepTwo) {
      setValue("email", userData.stepTwo.email);
      setValue("phoneNumber", userData.stepTwo.phoneNumber);
      setValue("fax", userData.stepTwo.fax);
      setValue("linkedInUrl", userData.stepTwo.linkedInUrl);
    }
  }, [userData]);
  return {
    register,
    handleSubmit,
    errors,
    getValues,
  };
};

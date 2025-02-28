import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserAddressFormData,
  userAddressSchema,
} from "@/utils/validations/zodSchema";
import { useAppSelector } from "@/redux/hooks";
import { selectStepState } from "@/redux/slices/stepSlice";
import { useEffect } from "react";

export const useStepThree = () => {
  const userData = useAppSelector(selectStepState);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<UserAddressFormData>({
    resolver: zodResolver(userAddressSchema),
  });

  useEffect(() => {
    if (userData?.stepThree) {
      setValue("country", userData.stepThree.country);
      setValue("state", userData.stepThree.state);
      setValue("city", userData.stepThree.city);
      setValue("zipCode", userData.stepThree.zipCode);
      setValue("address", userData.stepThree.address);
    }
  }, [userData]);
  return {
    register,
    handleSubmit,
    errors,
    getValues,
  };
};

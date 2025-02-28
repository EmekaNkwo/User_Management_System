import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserInfoFormData,
  userInfoSchema,
} from "@/utils/validations/zodSchema";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectStepState } from "@/redux/slices/stepSlice";

export const useStepOne = () => {
  const userData = useAppSelector(selectStepState);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<UserInfoFormData>({
    resolver: zodResolver(userInfoSchema),
  });

  useEffect(() => {
    if (userData?.stepOne) {
      setValue("firstName", userData.stepOne.firstName);
      setValue("lastName", userData.stepOne.lastName);
      setValue("dob", userData.stepOne.dob);
      setValue("occupation", userData.stepOne.occupation);
      setValue("gender", userData.stepOne.gender);
    }
  }, [userData]);
  return {
    register,
    handleSubmit,
    getValues,
    errors,
    isValid,
  };
};

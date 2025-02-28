import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserAcademicsFormData,
  userAcademicsSchema,
} from "@/utils/validations/zodSchema";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectStepState } from "@/redux/slices/stepSlice";

export const useStepFour = () => {
  const userData = useAppSelector(selectStepState);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<UserAcademicsFormData>({
    resolver: zodResolver(userAcademicsSchema),
  });
  useEffect(() => {
    if (userData?.stepFour) {
      setValue("pastSchools.0", userData.stepFour.pastSchools?.[0]);
      setValue("pastSchools.1", userData.stepFour.pastSchools?.[1]);
    }
  }, [userData]);
  return {
    register,
    handleSubmit,
    errors,
    getValues,
  };
};

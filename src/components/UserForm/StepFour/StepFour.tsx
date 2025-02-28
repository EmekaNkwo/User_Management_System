import React from "react";

import { CustomButton, FormInput } from "@/shared/CustomUIs";
import { Button } from "antd";
import { useStepFour } from "./useStepFour";
import { useAppDispatch } from "@/redux/hooks";
import { UserAcademicsFormData } from "@/utils/validations/zodSchema";
import { setStepState } from "@/redux/slices/stepSlice";

const StepFour = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const { register, handleSubmit, errors } = useStepFour();
  const dispatch = useAppDispatch();

  const handleSubmitForm = (data: UserAcademicsFormData) => {
    dispatch(setStepState({ stepFour: data }));
    nextStep();
  };
  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex flex-col gap-4"
    >
      <FormInput
        register={register}
        placeholder="Enter First School"
        name="pastSchools.0"
        errors={errors.pastSchools?.[0]}
        type="text"
        label="High School"
      />
      <FormInput
        register={register}
        placeholder="Enter Second School"
        name="pastSchools.1"
        errors={errors.pastSchools?.[1]}
        type="text"
        label="University School"
      />

      <div className="flex gap-2">
        <CustomButton variant="outline" onClick={prevStep}>
          Previous
        </CustomButton>
        <CustomButton>Preview</CustomButton>
      </div>
    </form>
  );
};

export default StepFour;

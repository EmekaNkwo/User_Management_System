import React from "react";
import { CustomButton, FormInput } from "@/shared/CustomUIs";
import { useStepTwo } from "./useStepTwo";
import { UserContactFormData } from "@/utils/validations/zodSchema";
import { useDispatch } from "react-redux";
import { setStepState } from "@/redux/slices/stepSlice";

const StepTwo = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const { register, handleSubmit, errors } = useStepTwo();

  const dispatch = useDispatch();

  const handleSubmitForm = (data: UserContactFormData) => {
    dispatch(setStepState({ stepTwo: data }));
    nextStep();
  };
  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex flex-col gap-4"
    >
      <FormInput
        register={register}
        placeholder="Email"
        className="border p-2"
        name="email"
        errors={errors.email}
        type="email"
        label="Enter your Email:"
      />
      <FormInput
        register={register}
        placeholder="Phone Number"
        className="border p-2"
        name="phoneNumber"
        errors={errors.phoneNumber}
        label="Enter your Phone Number:"
        type="text"
      />
      <FormInput
        register={register}
        placeholder="Fax"
        className="border p-2"
        name="fax"
        errors={errors.fax}
        label="Enter your Fax No:"
        type="text"
      />
      <FormInput
        register={register}
        placeholder="LinkedIn"
        className="border p-2"
        name="linkedInUrl"
        label="Enter your LinkedIn URL"
        type="text"
        errors={errors.linkedInUrl}
      />
      <div className="flex gap-2">
        <CustomButton variant="outline" onClick={prevStep}>
          Previous
        </CustomButton>
        <CustomButton>Next</CustomButton>
      </div>
    </form>
  );
};

export default StepTwo;

import React from "react";
import {
  CustomButton,
  FormInput,
  FormSelect,
  ImageUpload,
} from "@/shared/CustomUIs";
import { useStepOne } from "./useStepOne";
import { UserInfoFormData } from "@/utils/validations/zodSchema";
import { useDispatch } from "react-redux";
import { setStepState } from "@/redux/slices/stepSlice";

const StepOne = ({ nextStep }: { nextStep: () => void }) => {
  const { register, handleSubmit, errors, control, setValue } = useStepOne();
  const dispatch = useDispatch();
  const handleSubmitForm = (data: UserInfoFormData) => {
    dispatch(setStepState({ stepOne: data }));
    nextStep();
  };
  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex flex-col gap-4 max-h-[450px] overflow-y-auto"
    >
      <ImageUpload
        control={control}
        name="profilePhoto"
        setValue={(name: string, value: string | null) => {
          setValue("profilePhoto", String(value));
        }}
      />
      <FormInput
        register={register}
        placeholder="First Name"
        className="border p-2"
        name="firstName"
        errors={errors?.firstName}
        type="text"
        label="Enter your First Name:"
      />
      <FormInput
        register={register}
        placeholder="Last Name"
        className="border p-2"
        name="lastName"
        errors={errors?.lastName}
        type="text"
        label="Enter your Last Name:"
      />
      <FormInput
        register={register}
        placeholder="Last Name"
        className="border p-2"
        name="dob"
        errors={errors?.dob}
        type="date"
        label="Enter your Date of Birth:"
      />
      <FormInput
        register={register}
        placeholder="Occupation"
        className="border p-2"
        name="occupation"
        errors={errors?.occupation}
        label="Enter your Occupation:"
        type="text"
      />

      <FormSelect
        label="Select your Gender:"
        name="gender"
        register={register}
        errors={errors?.gender}
        options={[
          { label: "Select Gender", value: "" },
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
          { label: "Other", value: "Other" },
        ]}
      />
      <CustomButton>Next</CustomButton>
    </form>
  );
};

export default StepOne;

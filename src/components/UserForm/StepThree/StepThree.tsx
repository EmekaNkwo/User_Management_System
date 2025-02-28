import { CustomButton, FormInput } from "@/shared/CustomUIs";
import { Button } from "antd";
import { useStepThree } from "./useStepThree";

import { setStepState } from "@/redux/slices/stepSlice";
import { UserAddressFormData } from "@/utils/validations/zodSchema";
import { useDispatch } from "react-redux";

const StepThree = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const { register, handleSubmit, errors } = useStepThree();
  const dispatch = useDispatch();

  const handleSubmitForm = (data: UserAddressFormData) => {
    dispatch(setStepState({ stepThree: data }));
    nextStep();
  };
  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex flex-col gap-4"
    >
      <FormInput
        register={register}
        placeholder="Enter Address"
        name="address"
        errors={errors.address}
        type="text"
        label="Enter your Address:"
      />
      <FormInput
        register={register}
        placeholder="Enter City"
        name="city"
        errors={errors.city}
        type="text"
        label="Enter your City:"
      />
      <FormInput
        register={register}
        placeholder="Enter State"
        name="state"
        errors={errors.state}
        type="text"
        label="Enter your State:"
      />
      <FormInput
        register={register}
        placeholder="Enter Country"
        name="country"
        errors={errors.country}
        type="text"
        label="Enter your Country:"
      />
      <FormInput
        register={register}
        placeholder="Enter Zip Code"
        name="zipCode"
        errors={errors?.zipCode}
        type="text"
        label="Enter your Zip Code:"
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

export default StepThree;

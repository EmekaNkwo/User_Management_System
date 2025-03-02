import { useAppSelector } from "@/redux/hooks";
import { useUserForm } from "./useUserForm";
import { selectStepState } from "@/redux/slices/stepSlice";
import { CustomButton } from "@/shared/CustomUIs";
import Image from "next/image";

const PreviewPage = ({ prevStep }: { prevStep: () => void }) => {
  const { isLoading, onCreateOrEditUserSubmit, isUpdateLoading, isEditMode } =
    useUserForm();
  const formData = useAppSelector(selectStepState);

  return (
    <>
      <div className="max-w-lg mx-auto p-6 border rounded shadow-sm overflow-y-auto max-h-[500px]">
        <h3 className="text-lg font-semibold">User Info</h3>
        <hr />
        <div className="flex flex-col gap-3 mt-3">
          <Image
            src={`data:image/jpeg;base64,${formData.stepOne.profilePhoto}`}
            alt="profile"
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
          <p>
            <strong>Name:</strong> {formData.stepOne.firstName}{" "}
            {formData.stepOne.lastName}
          </p>
          <p>
            <strong>DOB:</strong> {formData.stepOne.dob}
          </p>
          <p>
            <strong>Occupation:</strong> {formData.stepOne.occupation}
          </p>
          <p>
            <strong>Gender:</strong> {formData.stepOne.gender}
          </p>
        </div>

        <h3 className="text-lg font-semibold mt-4">Contact Details</h3>
        <hr />
        <div className="flex flex-col gap-3 mt-3">
          <p>
            <strong>Email:</strong> {formData.stepTwo.email}
          </p>
          <p>
            <strong>Phone:</strong> {formData.stepTwo.phoneNumber}
          </p>
          <p>
            <strong>Fax:</strong> {formData.stepTwo.fax}
          </p>
          <p>
            <strong>LinkedIn:</strong> {formData.stepTwo.linkedInUrl}
          </p>
        </div>

        <h3 className="text-lg font-semibold mt-4">Address</h3>
        <hr />
        <div className="flex flex-col gap-3 mt-3">
          <p>
            {formData?.stepThree?.address}, {formData?.stepThree?.city},{" "}
            {formData?.stepThree?.state}, {formData?.stepThree?.country}
          </p>
          <p>
            <strong>Zip Code:</strong> {formData?.stepThree?.zipCode}
          </p>
        </div>

        <h3 className="text-lg font-semibold mt-4">Academic Background</h3>
        <hr />
        <div className="flex flex-col gap-3 mt-3">
          {formData?.stepFour?.pastSchools?.map((school, index) => (
            <li key={index}>🎓 {school}</li>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <CustomButton variant="outline" onClick={prevStep}>
          Back
        </CustomButton>
        <CustomButton
          disabled={isLoading || isUpdateLoading}
          onClick={onCreateOrEditUserSubmit}
        >
          {isLoading || isUpdateLoading
            ? "Submitting..."
            : isEditMode
            ? "Update"
            : "Submit"}
        </CustomButton>
      </div>
    </>
  );
};

export default PreviewPage;

import { Modal, Steps } from "antd";
import React, { useEffect } from "react";
import { useUserForm } from "./useUserForm";
import StepOne from "./StepOne/StepOne";
import StepTwo from "./StepTwo/StepTwo";
import StepThree from "./StepThree/StepThree";
import StepFour from "./StepFour/StepFour";
import PreviewPage from "./PreviewPage";
import { useAppSelector } from "@/redux/hooks";
import { selectStepState } from "@/redux/slices/stepSlice";

interface IModalProps {
  isModalOpen: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const UserModal = ({ isModalOpen, setOpenModal }: IModalProps) => {
  const { step, nextStep, prevStep } = useUserForm();
  const userData = useAppSelector(selectStepState);

  useEffect(() => {
    if (userData.closeModel) {
      setOpenModal(false);
    }
  }, [userData.closeModel]);

  const steps = [
    {
      title: "",
      content: <StepOne nextStep={nextStep} />,
    },
    {
      title: "",
      content: <StepTwo nextStep={nextStep} prevStep={prevStep} />,
    },
    {
      title: "",
      content: <StepThree nextStep={nextStep} prevStep={prevStep} />,
    },
    {
      title: "",
      content: <StepFour nextStep={nextStep} prevStep={prevStep} />,
    },
    {
      title: "",
      content: <PreviewPage prevStep={prevStep} />,
    },
  ];
  return (
    <Modal
      title={userData.isEdit ? "Edit User" : "Add User"}
      open={isModalOpen}
      onOk={() => setOpenModal(false)}
      onCancel={() => setOpenModal(false)}
      cancelButtonProps={{
        style: {
          display: "none",
        },
      }}
      okButtonProps={{
        style: {
          display: "none",
        },
      }}
    >
      <Steps current={step} items={steps} />
      <div className="mt-5">{steps[step].content}</div>
    </Modal>
  );
};

export default UserModal;

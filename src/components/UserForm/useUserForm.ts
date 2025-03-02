import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearStepState } from "@/redux/slices/stepSlice";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import { message } from "antd";
import { useAppSelector } from "@/redux/hooks";
import { selectStepState, setStepState } from "@/redux/slices/stepSlice";

export const useUserForm = () => {
  const [step, setStep] = useState(0);

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userData = useAppSelector(selectStepState);
  const isEditMode = userData.isEdit;
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const prevStep = () => {
    if (step === 0) return;
    setStep(step - 1);
  };

  const resetForm = () => {
    setStep(0);
    dispatch(clearStepState());
    dispatch(setStepState({ closeModel: true }));
  };

  const onCreateOrEditUserSubmit = async () => {
    const userDetails = {
      academics: userData.stepFour,
      contact: userData.stepTwo,
      address: userData.stepThree,
      firstName: userData.stepOne.firstName,
      lastName: userData.stepOne.lastName,
      dob: userData.stepOne.dob,
      gender: userData.stepOne.gender,
      occupation: userData.stepOne.occupation,
      profilePhoto: userData.stepOne.profilePhoto,
    };

    if (isEditMode) {
      try {
        await updateUser({
          id: userData.userId,
          data: userDetails,
        }).unwrap();
        message.success("User updated successfully");
        dispatch(setStepState({ closeModel: true }));
        resetForm();
      } catch (err) {
        message.error("Failed to update user. Please try again.");
      }
    } else {
      try {
        await createUser({
          ...userDetails,
        }).unwrap();
        message.success("User created successfully");
        resetForm();
      } catch (err) {
        message.error("Failed to create user. Please try again.");
      }
    }
  };

  const onDeleteUser = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        message.success("User deleted successfully");
        resetForm();
      } catch (err) {
        message.error("Failed to delete user. Please try again.");
      }
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  return {
    step,
    nextStep,
    prevStep,
    createUser,
    isModalOpen,
    setIsModalOpen,
    resetForm,
    isLoading,
    onCreateOrEditUserSubmit,
    isUpdateLoading,
    isEditMode,
    onDeleteUser,
  };
};

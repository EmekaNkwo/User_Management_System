import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import { RootState } from "../store";
import {
  UserInfoFormData,
  UserContactFormData,
  UserAcademicsFormData,
  UserAddressFormData,
} from "@/utils/validations/zodSchema";

export type StepState = {
  stepOne: UserInfoFormData;
  stepTwo: UserContactFormData;
  stepThree: UserAddressFormData;
  stepFour: UserAcademicsFormData;
  isEdit: boolean;
  userId: string;
  closeModel: boolean;
};

export const initialState = {
  stepState: {
    stepOne: {},
    stepTwo: {},
    stepThree: {},
    stepFour: {},
    isEdit: false,
    userId: "",
    closeModel: false,
  },
} as {
  stepState: StepState;
};

const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    setStepState: (state, action) => {
      state.stepState = _.mergeWith(
        state.stepState,
        action.payload,
        // eslint-disable-next-line consistent-return
        (objValue, srcValue) => {
          if (_.isArray(objValue)) {
            return srcValue;
          }
        }
      );
    },
    clearStepState: (state) => {
      state.stepState = initialState.stepState;
    },
  },
});

export const { setStepState, clearStepState } = stepSlice.actions;

export const selectStepState = (state: RootState): StepState => {
  return state.stepData.stepState;
};

export default stepSlice.reducer;

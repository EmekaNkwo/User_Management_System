"use client";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { Button, Table } from "antd";
import { useUserForm } from "./UserForm/useUserForm";
import UserModal from "./UserForm/UserModal";
import { UserProfile } from "@/shared/models";
import useUsers from "./useUsers";
import { CustomButton } from "@/shared/CustomUIs";
import { useDispatch } from "react-redux";
import { clearStepState, setStepState } from "@/redux/slices/stepSlice";
import moment from "moment";

const UserTable = () => {
  const { isModalOpen, setIsModalOpen, onDeleteUser } = useUserForm();
  const { data, isLoading } = useUsers();
  const dispatch = useDispatch();
  const columns: ColumnsType<UserProfile> = [
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      render: (value) => moment(value).format("YYYY-MM-DD"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <CustomButton
            variant="outline"
            onClick={() => {
              setIsModalOpen(true);
              dispatch(
                setStepState({
                  isEdit: true,
                  closeModel: false,
                  userId: record.id,
                  stepOne: {
                    firstName: record.firstName,
                    lastName: record.lastName,
                    dob: record.dob,
                    gender: record.gender,
                    occupation: record.occupation,
                    profilePhoto: record.profilePhoto,
                  },
                  stepTwo: record.contact,
                  stepThree: record.address,
                  stepFour: record.academics,
                })
              );
            }}
          >
            Edit
          </CustomButton>
          <CustomButton
            variant="outline"
            className="text-red-500 border border-red-500"
            onClick={() => {
              onDeleteUser(Number(record.id) || 0);
            }}
          >
            Delete
          </CustomButton>
        </div>
      ),
    },
  ];
  return (
    <>
      {isModalOpen && (
        <UserModal isModalOpen={isModalOpen} setOpenModal={setIsModalOpen} />
      )}
      <div className="flex flex-col gap-4 p-5">
        <div className="flex justify-end">
          <CustomButton
            onClick={() => {
              dispatch(
                setStepState({
                  closeModel: false,
                })
              );
              dispatch(clearStepState());
              setIsModalOpen(true);
            }}
          >
            Add User
          </CustomButton>
        </div>
        <Table
          columns={columns}
          pagination={{
            pageSize: 10,
            total: data?.users?.length,
          }}
          loading={isLoading}
          className="shadow-sm"
          dataSource={data?.users || []}
          scroll={{ x: 600 }}
          bordered
        />
      </div>
    </>
  );
};

export default UserTable;

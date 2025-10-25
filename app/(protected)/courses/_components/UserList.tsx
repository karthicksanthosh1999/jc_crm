import React from "react";
import UserCard from "./userCard";
import { courseValidationSchemaType } from "@/schema/course_schema";

interface IProps {
  courseList: courseValidationSchemaType[];
}

const UserList = ({ courseList }: IProps) => {
  return (
    <div className="grid md:grid-cols-4 grid-cols-1">
      {courseList &&
        courseList.map((item: courseValidationSchemaType, idx: number) => (
          <UserCard
            image={item.image}
            title={item?.title}
            key={idx}
            id={item?.id || ""}
          />
        ))}
    </div>
  );
};

export default UserList;

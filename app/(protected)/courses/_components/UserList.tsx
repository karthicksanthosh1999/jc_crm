import React, { useEffect } from "react";
import UserCard from "./userCard";
import { courseValidationSchemaType } from "@/schema/course_schema";

interface IProps {
  courseList: courseValidationSchemaType[];
}

const UserList = ({ courseList }: IProps) => {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1">
      {courseList &&
        courseList.map((item: courseValidationSchemaType, idx: number) => (
          <UserCard image={item.image} name={item?.title} key={idx} />
        ))}
    </div>
  );
};

export default UserList;

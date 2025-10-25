import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  cardTitle: string;
  description: string;
  className?: string;
};

const ChartCard = ({ cardTitle, children, description, className }: Props) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardContent className="w-full">{children}</CardContent>
      </CardHeader>
    </Card>
  );
};

export default ChartCard;

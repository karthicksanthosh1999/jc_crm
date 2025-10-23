import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Edit, TrashIcon } from "lucide-react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface IProps {
  title: string;
  image: StaticImport;
}

export default function UserCard({ image, title }: IProps) {
  return (
    <div className="w-full p-6 flex justify-center">
      <Card className="w-xs">
        <CardContent className="px-3">
          <div className="aspect-square rounded-md bg-gray-100 mb-2">
            <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
              <Image
                alt={title ?? "N/A"}
                src={image}
                width={100}
                height={100}
                className="w-full h-full object-center"
              />
            </div>
          </div>
          <CardTitle className="text-sm mb-1">{title ?? "N/A"}</CardTitle>
          <div className="flex items-center gap-2 ">
            <Button
              size="icon"
              variant={"default"}
              className="text-xs px-2 py-1 h-7 cursor-pointer">
              <Edit />
            </Button>
            <Button
              size="icon"
              variant={"destructive"}
              className="text-xs px-2 py-1 h-7 cursor-pointer">
              <TrashIcon />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

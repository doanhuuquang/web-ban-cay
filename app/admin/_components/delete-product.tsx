import { TriangleAlertIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

const AlertDialogDestructive = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-md border-none bg-transparent shadow-none"
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="items-center">
          <div className="bg-destructive/10 mx-auto mb-2 flex size-12 items-center justify-center rounded-full">
            <TriangleAlertIcon className="text-destructive size-6" />
          </div>
          <AlertDialogTitle>Chắc chắn muốn xoá?</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            <span className="mt-4 flex items-center justify-center gap-3">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Không hỏi lại</Label>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-md">Huỷ</AlertDialogCancel>
          <AlertDialogAction className="rounded-md bg-destructive dark:bg-destructive/60 hover:bg-destructive focus-visible:ring-destructive text-white">
            Xoá
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogDestructive;

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

export default function ChatBotPopup() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            variant={"default"}
            size={"icon"}
            className="p-6 rounded-full border-2 border-background relative overflow-hidden"
          >
            <Image
              src={"/assets/images/decorations/chat-bot.png"}
              alt="Gplant"
              fill
              className="w-full h-full absolute top-0 left-0 z-0"
            />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4"></div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

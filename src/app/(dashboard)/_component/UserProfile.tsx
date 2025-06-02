import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserEditProfile from "./UserEditProfile";
import { auth } from "@/lib/auth";

export default async function UserProfile() {
  const session = await auth();
  return (
    <Dialog>
      <DialogTrigger className="w-full text-left px-2 py-1 cursor-pointer hover:bg-muted-foreground/5">
        Profile
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>Edit your profile details here.</DialogDescription>
        </DialogHeader>

        {/**user profile display and editor */}
        <UserEditProfile
          firstName={session?.user.firstName}
          lastName={session?.user.lastName}
          currency={session?.user.currency}
          email={session?.user.email}
        />
      </DialogContent>
    </Dialog>
  );
}

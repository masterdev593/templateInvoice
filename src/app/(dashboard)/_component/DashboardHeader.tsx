import { auth } from "@/lib/auth"
import UserProfileDropDown from "./UserProfileDropdown"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default async function DashboardHeader(){
    const session = await auth()
    return(
       <header className="sticky top-0 h-14  w-full border-b backdrop-blur-3xl flex items-center px-4">
            <SidebarTrigger/>
            <div>
                Welcome <span className="font-semibold">
                    <span>{session?.user.firstName ?? "-"}</span>
                    {" "}
                    <span>{session?.user.lastName ?? "-"}</span>
                </span>
            </div>

            <div className="ml-auto w-fit">
                <UserProfileDropDown
                    isArrowUp={false}
                    isFullName={false}
                />
            </div>
       </header>
    )
}
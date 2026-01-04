import { respondInvite } from "@/services/invite.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Icon from "../icon";
import UserAvatar from "../user-avatar";

type Props = {
  icon: string;
  invites?: Invite[];
};

export default function NotificationLink({ icon, invites }: Props) {
  const router = useRouter();
  const handleInviteClick = async (invite: Invite, status: string) => {
    respondInvite(invite._id, status).then(() => {
      if (status === "accepted") router.push(`/player`);
    });
  };

  return (
    <div className="relative w-[70px] h-[70px] flex items-center justify-center group">
      <Image
        src="/images/gray-circle.svg"
        width={70}
        height={70}
        alt="Home"
        className="absolute top-0 left-0"
      />
      <Icon icon={icon} iconSize={35} variation="text-white" />

      {invites && invites.length > 0 && (
        <div
          className="w-[70px] h-full absolute top-0 right-0 rounded-[40px] border-0 flex flex-col items-center scrollbar-hide
          overflow-hidden transition-all duration-300 ease-in-out group-hover:overflow-y-scroll group-hover:p-4 group-hover:w-[550px] group-hover:border-[#ff581c] group-hover:border-4 group-hover:h-[300px] group-hover:notification-gradient"
        >
          {invites.map((invite) => {
            if (invite.status === "pending") {
              return (
                <div
                  key={invite._id}
                  className="ml-5 opacity-0 transition-opacity duration-300 ease-in-out flex flex-col justify-start group-hover:opacity-100"
                >
                  {/* <h2 className="text-3xl font-display ">
                  ZAHTEV ZA GLEDANJE FILMA
                </h2> */}
                  <div className="flex items-start mt-4 gap-3">
                    <UserAvatar
                      firstname={invite.fromUserId.firstName}
                      lastname={invite.fromUserId.lastName}
                      sizeRem={3}
                    />
                    <div>
                      <p className="text-2xl leading-6">
                        <b>
                          {invite.fromUserId.firstName}{" "}
                          {invite.fromUserId.lastName}
                        </b>{" "}
                        vas poziva da zajedno gledate “<b>film</b>”
                      </p>

                      <div className="mt-4 flex gap-3">
                        <div
                          className="px-4 py-1 bg-[#52b561] flex items-center rounded-[20px] cursor-pointer"
                          onClick={() => handleInviteClick(invite, "accepted")}
                        >
                          <Icon icon="check" />
                          <p>Prihvati</p>
                        </div>

                        <div
                          className="px-4 py-1 bg-[#c01e1e] flex items-center rounded-[20px] cursor-pointer"
                          onClick={() => handleInviteClick(invite, "declined")}
                        >
                          <Icon icon="close" />
                          <p>Odbij</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}

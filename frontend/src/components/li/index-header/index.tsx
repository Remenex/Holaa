import RedirectButton from "@/components/lib/button/redirect-button";
import Logo from "@/components/lib/logo";
import UserDropdown from "@/components/user-dropdown";

export function IndexHeader() {
  return (
    <div className="w-full main-container flex justify-center absolute top-0 z-10">
      <div className="w-full max-w-[1720px] mt-6 flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-6">
          <RedirectButton
            text="POPULARNI FILMOVI"
            className=""
            iconImage="crown"
            iconSize={30}
            iconMargin="10"
            url=""
          />
          {/* <ModernIcon icon="person" /> */}
          <div className="relative">
          <UserDropdown/>

          </div>
        </div>
      </div>
    </div>
  );
}

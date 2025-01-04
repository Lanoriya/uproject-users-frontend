import { UserHeader } from "../user-page/user-header/UserHeader";
import { UserSide } from "../user-page/user-side/UserSide";
import { UserMain } from "../user-page/user-main/UserMain";
import "./Main.css";
import "../user-page/user-header/UserHeader.css";
import "../user-page/user-side/UserSide.css";
import "../user-page/user-main/UserMain.css";
import "../user-page/user-components/user-configurator/UserConfigurator.css";

export function UserPage() {
  return (
    <div className="admin-page">
      <UserHeader />
      <UserSide />
      <UserMain />
    </div>
  )
};
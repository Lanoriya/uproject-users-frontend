import { Routes, Route } from 'react-router-dom';
import { UserConfigurator } from "../user-components/user-configurator/UserConfigurator";
import { UserMath } from "../user-components/user-math/UserMath";

export function UserMain() {
  return (
    <div className="user-main">
        <Routes>
          <Route path="/user-math" element={<UserMath />}/>
        </Routes>
        <Routes>
          <Route path="/user-configurator" element={<UserConfigurator />}/>
        </Routes>
    </div>
  )
};
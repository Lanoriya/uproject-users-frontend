import { Link } from 'react-router-dom';
import lanoriyaLogo from '../../../assets/lanoriya-logo.jpg';

export function UserSide() {
  return (
    <aside className="user-side">
      <div className="sideNavigation-block">
        <a className='sideNavigation-link' href="#">
          <img className="sideNavigation-logo" src={lanoriyaLogo} alt="lanoriya-logo" />
        </a>
        <nav>
          <div className="side-block">
            <h5>Основное</h5>
            <div className="side-block-link">

              <Link to="/user-configurator">Конфигуратор пользователей</Link>
            </div>
            <div className="side-block-link">

              <Link to="/user-math">Калькулятор пользователей</Link>
            </div>
            <div className="side-block-link">

              <a href="#">Вкладка 3</a>
            </div>
          </div>
          <div className="side-block">
            <h5>Остальное</h5>
            <div className="side-block-link">

              <a href="#">Вкладка 4</a>
            </div>
            <div className="side-block-link">

              <a href="#">Вкладка 5</a>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  )
};
import React from 'react'
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import classes from './MenuAppStyle.module.css';


const MenuAppBar = ({header, active, setActive, num}) => {

  const items = [
    {value: "Главная", href: "/main", icon: "dashboard"},
    {value: "Добавить", href: "/add-moderator", icon: "person_add"}, 
    {value: "КПД модераторов", href: "/kpd", icon: "trending_up"}, 
    {value: "Логи", href: "/logs", icon: "analytics"}, 
    {value: "Архив", href: '/archive', icon: "archive"}
  ]
  
  const logout = () => {
    fetch('/api/logout', {method: "POST"})
      .then(response => response.json())
      .then(response => {
        console.log(response.message)
        window.location.replace('/login')
      })
  }
  
  return (
    <div className={classes.navbar}>
        <nav className={classes.main_navbar}>
          <div className={classes.burger_btn} onClick={() => setActive(!active)}>
              <MenuSharpIcon/>
          </div>
          <div className={classes.nav_title}>
            <div className={classes.nav_title_button}>
              <Link to='/'>Панель модератора</Link>
            </div>
          </div>
          <div className={classes.button}>
            <div className={classes.logout_button}>
              <LogoutIcon onClick={logout}/>
            </div>
          </div>
        </nav>
        <div className={active ? `${classes.menu} ${classes.active}` : `${classes.menu}`} onClick={() => setActive(false)}>
          <div className={classes.menu__content} onClick={e => e.stopPropagation()}>
            <div className={classes.menu__header}>{header}</div>
              {num <=2
              ? items.map(item => (
                  <div className={classes.menu_list_item} key={item.value}>
                    <Link to={item.href}>
                      <div className={classes.menu_list_icon}>
                      <span className="material-icons">
                      {item.icon}
                      </span>
                      </div>
                      <div className={classes.menu_item_title}>{item.value}</div>
                    </Link>
                  </div>
              ))
              : num === 3 
              ? <>
                  <div className={classes.menu_list_item}>
                    <Link to='/main'>
                      <div className={classes.menu_list_icon}>
                      <span className="material-icons">
                      dashboard
                      </span>
                      </div>
                      <div className={classes.menu_item_title}>Главная</div>
                    </Link>
                  </div>
                  <div className={classes.menu_list_item}>
                    <Link to='/kpd'>
                      <div className={classes.menu_list_icon}>
                      <span className="material-icons">
                      trending_up
                      </span>
                      </div>
                      <div className={classes.menu_item_title}>КПД модераторов</div>
                    </Link>
                  </div>
                  <div className={classes.menu_list_item}>
                    <Link to='/logs'>
                      <div className={classes.menu_list_icon}>
                      <span className="material-icons">
                        analytics
                      </span>
                      </div>
                      <div className={classes.menu_item_title}>Логи</div>
                    </Link>
                  </div>
                </>
              : num >= 4 
              ? <div className={classes.menu_list_item}>
                  <Link to='/main'>
                    <div className={classes.menu_list_icon}>
                    <span className="material-icons">
                    dashboard
                    </span>
                    </div>
                    <div className={classes.menu_item_title}>Главная</div>
                  </Link>
                </div>
              : ''
              }
          </div>
        </div>
    </div>
  );
}

export default MenuAppBar

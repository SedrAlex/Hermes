import { Outlet ,Link } from "react-router-dom";
import { Fragment,useContext } from "react";
import { ReactComponent as SLR } from "../../assets/SLR.svg"  ;

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { NavigationContainer,Navlinks,Navlink,LogoContainer } from "./navigation.styles";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../Utils/fireBase/fireBase.utils";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
//useSelector  is just a function that extracts all the values from the redux store
//state is a big object which is consts of a;;we have here the whole state, then the user reducet after the current user



const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <SLR className='logo' />
        </LogoContainer>
        <Navlinks>
          <Navlink to='/shop'>SHOP</Navlink>

          {currentUser ? (
            <Navlink as='span' onClick={signOutUser}>
              SIGN OUT
            </Navlink>
          ) : (
            <Navlink to='/auth'>SIGN IN</Navlink>
          )}
          <CartIcon />
        </Navlinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
  /**
   * There is another hook that used in redux in order to extract the data from the state which is useSE
   */
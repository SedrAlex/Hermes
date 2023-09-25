import styled from "styled-components";
import { Link } from "react-router-dom";

export const  NavigationContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;

`
export const  LogoContainer = styled(Link)`
      height: 100%;
      width: 10px;
      padding: 0px 15px;
`
export const Navlinks = styled.div`
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
`
export const Navlink = styled(Link)`
        padding: 5px 15px;
        cursor: pointer;
      
`

  
     
  
      
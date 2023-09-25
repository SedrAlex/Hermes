import { async } from "@firebase/util";
import { createContext, useState, useEffect} from "react";
import SHOP_DATA from '../shop-data.js';
import { addCollectioAndDocuments } from "../Utils/fireBase/fireBase.utils.js";
import { getCategoriesAndDocuments } from "../Utils/fireBase/fireBase.utils.js";
export const CategoriesContext = createContext({
    categoriesMap: {},
});
    export const CategoriesProvider = ({children}) => {
        const[categoriesMap, setCategoriesMap] = useState({});
        // useEffect(()=>{
        //     addCollectioAndDocuments('categories', SHOP_DATA)
        // },[])

        useEffect(()=>{
            const getCategoriesMap = async()=>{
                const categoryMap = await getCategoriesAndDocuments();
                console.log(categoryMap);
                setCategoriesMap(categoriesMap)
            }

            getCategoriesMap();
        },[]);

        const value = { categoriesMap };
        return(
            <CategoriesContext.Provider value={value}>  
            {children}
            </CategoriesContext.Provider>
        )
    }
    
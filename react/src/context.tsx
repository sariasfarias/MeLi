import React, { createContext, useState } from "react";
import { CategoryContextType } from "./types";
<></>
export const CategoryContext = createContext<CategoryContextType | null>(null);

export const CategoryProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    
    const [categoryList, setCategories] = useState<String[]>([]);

    const updateCategoryList = (categoryList ?: String[]) => {
        setCategories(categoryList || []);
    }

    return (
        <CategoryContext.Provider value={{ categoryList, updateCategoryList }}>
          {children}
        </CategoryContext.Provider>
    );
}


import { useContext, useEffect, useState } from "react";
import { IItem, ISearchBarResponse } from "../../types";
import { ItemCard } from "../ItemCard/ItemCard";
import { getItems } from "../../api/Items";
import { useSearchParams } from "react-router-dom";
import './ItemCardList.scss';
import { CategoryContext } from "../../context";

export function ItemCardList(){
    const [data, setData] = useState<ISearchBarResponse>();
    const [searchParams] = useSearchParams();
    const queryParam = searchParams.get("search")?.toString() || '';
    const category = useContext(CategoryContext);
    
    useEffect(()=> {
        getItems(queryParam, setData);
        category?.updateCategoryList(categories);
    }, [searchParams]);
    
    const items = data?.items || [] ;
    const categories = data?.categories || [];

    return (
        <div className="item-card-list"> 
            <div data-testid="item-card-categories" className="item-card-list__categories"> 
                {categories.map((category, index) => {
                    return index === categories.length-1 ? <strong>{category}</strong> : <>{category + "   >   "}</>
                })}
            </div>
            {
                items.map((item:IItem, index) => 

                    <ItemCard
                        data-testid="item-card"
                        key={index}
                        id={item.id}
                        title={item.title}
                        picture={item.picture}  
                        price={item.price} 
                        condition={item.condition} 
                        freeShipping={item.free_shipping}    
                    />

                )
            }
        </div>
    );
}
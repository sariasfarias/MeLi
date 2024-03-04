import { useEffect, useState } from "react";
import { IItem, IItemCard, ISearchBarResponse } from "../../types";
import { ItemCard } from "../ItemCard/ItemCard";
import { getItems } from "../../api/SearchBar";
import { useSearchParams } from "react-router-dom";
import './ItemCardList.scss';

export function ItemCardList(){
    const [data, setData] = useState<ISearchBarResponse>();
    const [searchParams] = useSearchParams();
    const queryParam = searchParams.get("search")?.toString() || '';
    
    useEffect(()=> {
        getItems(queryParam, setData);
    }, [searchParams]);

    const items = data?.items || [] ;
    const selectCategory = data?.categories.pop();
    const categories = data?.categories.join("  >  ");

    return (
        <div className="item-card-list">
            <div className="item-card-list__categories"> 
                {categories + "  >  "}<strong>{selectCategory}</strong>
            </div>
            {
                items.map((item:IItem, index) => 

                    <ItemCard
                        key={index}
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
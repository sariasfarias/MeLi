import { useContext, useEffect, useState } from "react";
import { IItemDescription, IItemDetail, IPrice } from "../../types";
import './ItemDetail.scss';
import { getItem } from "../../api/Item";
import { useParams } from "react-router-dom";
import { CategoryContext } from "../../context";

export function ItemDetail (){
    const [data, setData] = useState<IItemDescription>();
    const { itemId } = useParams();
    const category = useContext(CategoryContext);
    
    const getPrice = (price ?: IPrice) => {
        const decimals = price?.decimals ? "," + price.decimals : "";
        return "$ " + price?.amount + decimals;
    }

    useEffect(()=> {
        getItem(itemId || "", setData);
    },[]);
 
    return (
        <>
        <div data-testid="item-card-categories" className="item-card-list__categories"> 
            {category?.categoryList.map((cat, index) => {
                return index === category.categoryList.length-1 ? <strong>{cat}</strong> : <>{cat + "   >   "}</>
            })}
        </div>
        <div className="item-detail">
            <div className="item-detail__box">
                <img data-testid="item-detail-picture" className="item-detail__picture" src={data?.picture} alt={data?.title} />
                <div data-testid="item-detail-description" className="item-detail__description-box">
                    <div className="item-detail__description-title">Descripción del producto</div>
                    <div className="item-detail__description-text">{data?.description}</div>
                </div>
            </div>
            <div className="item-detail__information">
                <div className="item-detail__data">
                    {data?.condition + " - " + data?.sold_quantity + " vendidos"}
                </div>
                <div data-testid="item-detail-title" className="item-detail__title"><strong>{data?.title}</strong></div>
                <div data-testid="item-detail-price" className="item-detail__price">{getPrice(data?.price)}</div>
                <button className="item-detail__button">Comprar</button>
            </div>
        </div>
        </>
    )
}
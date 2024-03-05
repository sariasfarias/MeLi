import { IItemCard, IPrice } from "../../types";
import './ItemCard.scss';

export function ItemCard(props : IItemCard){
  const getPrice = (price : IPrice) => {
    const decimals = price.decimals ? "," + price.decimals : "";
    return "$ " + price.amount + decimals;
  }

  const onClick = (id : String) => {
    window.location.href = `/items/${id}`;
  }
    
  return (
    <div className='item-card' onClick={() => onClick(props.id)}>
      <div className='item-card__box'>
        <img className='item-card__picture' src={props.picture} alt={props.title} />
        <div className='item-card__information'>
          <div className='item-card__price'> {getPrice(props.price)} </div>
          <div className='item-card__title'> {props.title} </div>
          {props.freeShipping &&
            <div className='item-card__free-shipping_mobile'> Envío gratis </div>
          }
        </div>
        {props.freeShipping &&
          <div className='item-card__free-shipping_desktop'> Envío gratis </div>
        }
      </div>
      <hr/>
    </div>
  )
}
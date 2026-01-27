import React , {useRef} from 'react'
import './HappinessCards.css'

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";


const HappinessCards = () => {
    const sliderRef = useRef(null);

    const slideLeft = () => {
        if(sliderRef.current){
            sliderRef.current.scrollBy({left: -450});
        }
    };

    const slideRight = () =>{
        if(sliderRef.current){
            sliderRef.current.scrollBy({left: 450});
        }
    };

    const cards = [
        {
      id: 1,
      title: "Happiness Gift Card : Treat for 2 - Coimbatore",
      price: "1500",
      tag: "Treat For Two",
      color: "#5b9bd5",
      imgUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop" 
    },
    {
      id: 2,
      title: "Happiness Gift Card : Treat for 8 - Coimbatore",
      price: "7250",
      tag: "Treat For Eight",
      color: "#e06666",
      imgUrl: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Happiness Gift Card : Family Feast - Chennai",
      price: "4500",
      tag: "Family Pack",
      color: "#ffd966",
      imgUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Happiness Gift Card : Jumbo Pack - Bangalore",
      price: "9000",
      tag: "Jumbo Pack",
      color: "#93c47d",
      imgUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop"
    }
    ];

  return (
    <div className="happiness-section"> 
        <div className="section-header">
        <h2 className="section-title">Happiness Cards</h2>
            <div className="controls">
                <button className="view-all-btn">View All</button>
                <div className="arrow-btn">
                    <FaArrowLeft onClick={slideLeft}/>
                </div>
                <div className="arrow-btn">
                    <FaArrowRight onClick={slideRight}/>
                </div>
            </div>
        </div>

        <div className="cards-slider" ref={sliderRef}>
            {cards.map((card) => (
                <div className="card-item" key={card.id}>
                    <div className="card-image" style={{backgroundImage: `url(${card.imgUrl})`}}>
                        <div className="card-tag">{card.tag}</div>
                        <div className="img-overlay" style={{backgroundColor: card.color, opacity: 0.3}}></div>
                    </div>

                    <div className="card-content">
                        <h3 className='card-title'>{card.title}</h3>
                        <a href="#details" className='view-detail'>View Details</a>

                        <div className="card-footer">
                            <span className='price'>Rs. {card.price}</span>
                            <button className="add-btn">ADD</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default HappinessCards
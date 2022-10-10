
import "./ApartmentCard.css";
import Rating from "../../../../assets/icon-rating.svg";
import { motion } from "framer-motion";


const ApartmentCard = ({stay}) => {
    return ( 
        <motion.li
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="card">
            <figure className="card-img-container">
                <img src={stay.photo} alt={stay.title} loading="lazy" />
            </figure>

            <div className="card-detail">
                <div className="content-container">
                    {stay.superHost && <h4>Super Host</h4>}
                    <p className="content-text">{stay.type}{stay.beds && `.${stay.beds} beds`}</p>
                </div>
                <div className="rating-container">
                    <img src={Rating} alt="Rating Icon" />
                    <p className="rating-text">{stay.rating}</p>
                </div>
            </div>
            <h3 className="card-description">{stay.title}</h3>
        </motion.li>
     );
}

export default ApartmentCard;

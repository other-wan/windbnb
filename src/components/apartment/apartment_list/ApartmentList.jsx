
import ApartmentCard from "../apartment_card/ApartmentCard/ApartmentCard";
import "./ApartmentList.css";
import { AnimatePresence } from "framer-motion";

const ApartmentList = ({stays}) => {

    return (
        <ul className="stays-list">
            <AnimatePresence>
                {stays.map((stay, index) => (
                    <ApartmentCard 
                        key={index} 
                        stay={stay} />
                ))}
            </AnimatePresence>
        </ul>
     );
}
 
export default ApartmentList;
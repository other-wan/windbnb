import { useContext } from "react";
import { StayContext } from "../../contexts/StayContext";
import ApartmentList from "../apartment/apartment_list/ApartmentList";
import "./Main.css";


const Main = () => {
    const {stays,} = useContext(StayContext);

    return ( 
        <main>

            <section className="intro">
                <h1>Stays in Finland</h1>
                <h2>{stays.length > 12 ? "12+" : stays.length} Stays</h2>
            </section>

            <section className="stays">
                <ApartmentList stays={stays} />
            </section>

        </main>
     );
}
 
export default Main;
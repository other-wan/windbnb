import "./Modal.css";
import Close from "../../../assets/icon-close.svg";
import { useMemo, useReducer, useContext } from "react";
import { StayContext } from "../../../contexts/StayContext";


const reducer = (state, action) => {
    switch (action.type) {
        case "INCREASE-ADULT":
            return {...state, adultCount: state.adultCount + action.payload};

        case "DECREASE-ADULT":
            if (state.adultCount <= 0){
                return state;
            }
            return {...state, adultCount: state.adultCount - action.payload};
    
        case "INCREASE-CHILD":
            return {...state, childCount: state.childCount + action.payload};

        case "DECREASE-CHILD":
            if (state.childCount <= 0){
                return state;
            }
            return {...state, childCount: state.childCount - action.payload};
        
        default:
            return state;
    }
}

const Modal = ({toggleModal, formData, setFormData, active, setActive}) => {
    const {stays, setStays} = useContext(StayContext);

    const [state, dispatch] = useReducer(
        reducer, 
        {adultCount: 0, childCount: 0}
    );

    const uniqueCities = useMemo(() => {
        return [...new Set(
            JSON.parse(localStorage.getItem("STAYS"))
                .map(stay => stay.city)
        )]
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(stays);

    const handleSubmit = (e) => {
        e.preventDefault();

        setStays(
            JSON.parse(localStorage.getItem("STAYS"))
                .filter(stay => {
                    return (
                        formData.location && (state.childCount + state.adultCount) > 0 ?
                        formData.location === stay.city && 
                        state.childCount + state.adultCount <= stay.maxGuests : 
                        formData.location ? formData.location === stay.city :
                        state.childCount + state.adultCount <= stay.maxGuests
                    )
                }
            )
        );
        
        toggleModal();
    }

    return (
        <section className="modal-container">
            <div className="modal">
                <div className="modal-header">
                    <h5>Edit your search</h5>

                    <button className="modal-btn-toggle" onClick={toggleModal}>
                        <img src={Close} alt="Close Icon" />
                    </button>
                </div>

                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="location">
                        <div className="input-container">
                            <input 
                                type="text" 
                                id="location-input"
                                autoComplete="off" 
                                placeholder="Add Location"
                                value={formData.location ? 
                                    formData.location + 
                                    " Finland" : ""}
                                onChange={() => {}}
                                onClick={() => setActive(true)}  />
                            <label htmlFor="location-input">Location</label>
                        </div>
                        <ul className={`location-select ${active ? "active" : ""}`}>
                            {uniqueCities.map(
                                (stay, stayIndex) => (
                                    <li 
                                        key={stayIndex}
                                        onClick={() => setFormData(
                                            {...formData, location: uniqueCities[stayIndex]}
                                        )}
                                    >
                                        {stay + " Finland"}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                    <div className="guest">
                        <div className="input-container">
                            <input 
                                type="number" 
                                id="guest-input" 
                                autoComplete="off" 
                                placeholder="Add Guests"
                                value={state.adultCount + state.childCount ? state.adultCount + state.childCount : "" }
                                onChange={() => {}}
                                onClick={() => setActive(false)}  />
                            <label htmlFor="guest-input">Guests</label>
                        </div>
                        <div className={`guest-select ${!active ? "active" : ""}`}>
                            <div className="adult-select">
                                <h3>Adults</h3>
                                <p>Age 13 or above</p>
                                <div className="btn-container">
                                    <button type="button" onClick={() => dispatch({type: "INCREASE-ADULT", payload: 1})}>+</button>
                                    <p>{state.adultCount}</p>
                                    <button type="button" onClick={() => dispatch({type: "DECREASE-ADULT", payload: 1})}>-</button>
                                </div>
                            </div>
                            <div className="children-select">
                                <h3>Children</h3>
                                <p>Age 2-12</p>
                                <div className="btn-container">
                                    <button type="button" onClick={() => dispatch({type: "INCREASE-CHILD", payload: 1})}>+</button>
                                    <p>{state.childCount}</p>
                                    <button type="button" onClick={() => dispatch({type: "DECREASE-CHILD", payload: 1})}>-</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="btn-submit-container">
                        <button className="btn-submit" type="submit">
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </section>
     );
}

export default Modal;

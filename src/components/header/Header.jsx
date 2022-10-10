import "./Header.css";
import Logo from "../../assets/logo.svg";
import Search from "../../assets/icon-search.svg";
import Modal from "../header/modal/Modal";
import { useState } from "react";

const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const [active, setActive] = useState(true);

    const [formData, setFormData] = useState({
        location: "",
        guests: 0
    });

    const toggleModal = () => {
        setShowModal(prev => !prev);
    }

    return (
        <header>
            <div className="header-container">
                <figure className="logo-container">
                    <img src={Logo} alt="Windbnb Logo" />
                </figure>

                <div className="toggle-btn-container">
                    <button onClick={() => {
                        toggleModal();
                        setActive(true);
                    }}>{formData.location ? formData.location + " Finland" : "Add Location"}</button>

                    <button 
                        onClick={() => {
                            toggleModal();
                            setActive(false);
                        }}>{formData.guests ? formData.guests + " guests" : "Add Guests"}</button>

                    <button>
                        <img src={Search} alt="Search Icon" />
                    </button>
                </div>
            </div>

            { showModal && <Modal 
                                toggleModal={toggleModal} 
                                formData={formData}
                                setFormData={setFormData}
                                active={active} 
                                setActive={setActive} /> 
            }
        </header>
    );
}
 
export default Header;
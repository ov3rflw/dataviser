import Image from "next/image";
import "./Main.css";

import Add from "../../../public/assets/add.svg";
import Test from '../../../public/assets/profile_test.jpg';
import Stars from "../../../public/assets/stars.svg"

export default function Main(){
    return(
        <div className="main__wrapper">
            <header>
                <div className="header__top">
                    <div className="header__top--title">
                        <h2>Tableau de bord</h2>
                    </div>
                    <div className="header__top--profile">
                        <div className="addimg__wrapper">
                            <Image src={Add} alt="add icon" width={25} className="add_icon"/>
                        </div>
                        <Image src={Test} alt="test" width={45} className="test"/>
                    </div>
                </div>
            </header>
            <main>
                <div className="main__top">
                    <div className="main__lastAlert">
                        <p>Alertes récentes</p>
                    </div>
                    <div className="main__tasks">
                        <p>
                            Tâche à effectuer
                        </p>
                    </div>
                    <div className="main__flux">
                        <p>Flux</p>
                    </div>
                    <div className="main__plan--wrapper">
                        <div className="main__plan--content"> {/* à faire disparaitre quand la transaction est faite*/}
                            <div className="plan__content--background">
                                <div className="plan__background--content">
                                    <div className="background__content--top">
                                        <Image src={Stars} alt="icon stars" width={25} style={{position: "relative", float: "right"}}/>
                                        <p id="price">95.5€</p>
                                        <p id="perMonth">Par Mois</p>
                                    </div>
                                    <div className="background__content--footer">
                                        <p id="background__content--hero">
                                            Choisissez Le Meilleur Plan Pour Vous!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="plan__content--footer">
                                <a href="#" id="details">
                                    Détails
                                </a>
                                <a href="#" id="levelUp">
                                    Mise à niveau
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main__bottom">
                    <div className="main__bottom--left">
                        
                    </div>
                    <div className="main__bottom--right">

                    </div>
                </div>
            </main>
        </div>
    )
}
import Image from "next/image"
import Stars from "../../../public/assets/stars.svg"


export default function Plan(){
    return(
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
    )
}
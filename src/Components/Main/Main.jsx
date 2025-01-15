import Image from "next/image";

import Alert from "../Alert/Alert";
import Flux from "../Flux/Flux";
import Tasks from "../Tasks/Tasks";
import Plan from "../Plan/Plan";

import "./Main.css";

import Add from "../../../public/assets/add.svg";
import Test from '../../../public/assets/profile_test.jpg';

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
                    <Alert />
                    <Tasks />
                    <Flux />
                    <div className="main__plan--wrapper">
                        <Plan />
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
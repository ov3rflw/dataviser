import Image from "next/image";

import Alert from "../Alert/Alert";
import Tasks from "../Tasks/Tasks";
import Messages from "../Messages/Message";
import Plan from "../Plan/Plan";
import Stats from "../Stats/Stats";

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
                    <div className="alert__wrapper">
                        <Alert />
                    </div>
                    <div className="messages__wrapper">
                        <Messages />
                    </div>
                    <div className="stats__wrapper">
                        <Stats />
                    </div>                    
                    <div className="main__plan--wrapper">
                        <Plan />
                    </div>
                </div>
                <div className="main__bottom">
                    <Tasks />
                    <div className="test">
                        <p>Hello,</p>
                    </div>
                    <div className="test2">
                        <p>World!</p>
                    </div>
                </div>
            </main>
        </div>
    )
}
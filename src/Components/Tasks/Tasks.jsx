import "./Tasks.css"

export default function Tasks(){

    const task_example = [
        {id:1,date:"12/01/2024", name:"Mettre à jour le pare feu", createdBy:"Moula13K", done: false},
        {id:2,date:"15/01/2024", name:"Paramétrer le webhook", createdBy: "sab1ni",done: false},
    ];

    return(
        <div className="main__tasks">
            <div className="main__tasks--header">
                <h2>Tâches</h2>
                <button className="main__tasks--addBtn">Ajouter une tâche</button>
            </div>
                <div className="tasks__table--header">
                    <span>Date</span>
                    <span>Tâche</span>
                    <span>Créé par : </span>
                </div>
            <div className="main__tasks--table">
                {task_example.map((task) => {
                    return(
                        <div className="table__row" key={task.id}>
                            <div className="tasks__info">
                               <span className="tasks__info--date">{task.date}</span>
                            </div>
                            <span className="tasks__info--name">
                                {task.name}
                            </span>
                            <span className="tasks__info--username">
                                {task.createdBy}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
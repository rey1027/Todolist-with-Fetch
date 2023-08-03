import React,{useState, useEffect} from "react";

import "../../styles/index.css";

//create your first component
const Home = () => {
	const [tarea,setTarea] = useState("");
	const [list,setlist] = useState([{ label: "Make the bed", done: false },{ "label": "Walk the dog", "done": false }]);
	const [username,setUsername] = useState("");

	const URL = "https://playground.4geeks.com/apis/fake/todos/user/"

	const handleInput = async(e) => {
		let texto = {label:e.target.value, done:false};
		if (e.keyCode == 13){
			setTarea(e.target.value);
			let arregtemp = [...list, texto];

			//Actualizar la lista de To-dos
			let response = await fetch(
				URL + username,
				{
					method:'PUT',
					headers: {
						'Content-Type': 'application/json'

					},
					body: JSON.stringify(arregtemp)
				}
			)
			if(response.ok){
				//SEGUNDA APROXIMACIÓN operador spread
				setlist([...list, texto]);

			}else{
				alert("Hubo un error al intentar actualizar la lista")
			}
			
		}
	}
	const handleUser = (e) => {
		setUsername(e.target.value);
	}

	const deleteTask = async(index) => {
		//PRIMERA APROXIMACIÓN
		let tempArr= list.slice(); //Copia de arreglo por valor
		tempArr = tempArr.filter((item,index2)=>{ return index2 != index })
		let response = await fetch(
			URL + username,
			{
				method:'PUT',
				headers: {
					'Content-Type': 'application/json'

				},
				body: JSON.stringify(tempArr)
			}
		)
		if(response.ok){
			setlist(tempArr);

		}else{
			alert("Hubo un error al intentar actualizar la lista")
		}

		

	}

	const deleteUser = async()=> {

		let response = await fetch(
			URL + username,
			{
				method:'DELETE',
				headers: {
					'Content-Type': 'application/json'

				}
			}
		)
		console.log("La respuesta del Delete:", response)

		let objResponse = await response.json();
		
		if(response.ok){
			alert(objResponse.msg)

		}else{
			alert(objResponse.msg)
		}

	}

	useEffect(()=>{ 

		const cargaLista = async()=> {
			let response = await fetch(URL+username); //
			//Response en este punto 
			if(response.ok){
				//hago algo si status esta entre 200-299
				let objResponse = await response.json();
				console.log("respuesta ok: ", objResponse);
				setlist(objResponse);
			}else{
				//error
				console.log("Error respuesta")
			}
		}

		cargaLista()

	},[username]);

	return (
		<>
			<div className="container">
				<input className="form-control mt-3 fs-4" type="text" placeholder="Escriba aqui un nombre de usuario" onKeyUp={
					(e) => {
									handleUser(e);
								}} />
				<p className=" titulo d-flex justify-content-center">To-dos</p>
				<ul class="list-group">
					<li class="list-group-item">
						<input className="form-control border-0 fs-4"  placeholder="What needs to be done?" 
							onKeyUp={
								(e) => {
									handleInput(e);
								}
							}
							
						/>
					</li>
					{list && list.length > 0 ? 
						<>{
							list.map((item,index)=>{
							return (
								<li className="list-group-item text-secondary " key={index}>
									<div className="row">
										<div className="col-10 ps-4 fs-5">
											{item.label}
										</div>
										<div className="col-2">
										<button className="btn btn-outline-danger border-0 me-2 ms-4" type="button" onClick={e=> {deleteTask(index)}}> X</button>
										</div>
									</div>
									
								</li>
							);
							})
						}</> : 
						<li className="list-group-item text-secondary"> The list is empty </li>
						}

					<li className="list-group-item">
					{list && list.length > 0 ? <p className="footer"> {list.length} item left</p> : <p className="footer"> You have no tasks to do </p>}
						 
					</li>
				</ul>

				<button className="btn btn-danger mx-3 my-4" type="button" onClick={e=> {deleteUser()}}> Eliminar Usuario</button>
			</div>
		</>
	);
};

export default Home;
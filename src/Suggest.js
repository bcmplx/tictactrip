import React, { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'
import ReactLoading from 'react-loading';
import axios from 'axios'
// import {IoMdArrowDropleft} from 'react-icons/io'

const Suggest = (props) => {

	const [data, setData] = useState([])
	const [loadingBubbles, setLoadingBubbles] = useState(false)


	const handleClick = (event) => {
		if(props.userDepart && props.suggest === 'end') {
			let result = event.target.innerHTML.split(',')
			props.setUserArrivee(result[0])
			props.setIsFocus('start')
			props.setActiveArrivee(false)
			props.setNextFocus()
			props.setResearchDone(true)
		}
		else if (props.suggest === 'end' && !props.userDepart  ) {
			let result = event.target.innerHTML.split(',')
			props.setUserArrivee(result[0])
			props.setIsFocus('start')
			props.setActiveArrivee(false)
			props.setActiveDepart(true)
			props.setDepartFocus()
		}
		else if (!props.userDepart && props.userArrivee) {
			let result = event.target.innerHTML.split(',')
			props.setUserDepart(result[0])
			props.setResearchDone(true)
			props.setNextFocus()
		}
		else if (props.userDepart && props.userArrivee){
			let result = event.target.innerHTML.split(',')
			props.setUserDepart(result[0])
			props.setResearchDone(true)
			props.setNextFocus()
		}
		else {
			let result = event.target.innerHTML.split(',')
			props.setUserDepart(result[0])
			props.setArrivFocus()
			props.setIsFocus('end')
			props.setActiveArrivee(true)
		}		
	}

	const title = () => {
		if(props.userInputDepart ||props.userDepart || props.userInputArrivee) {
			return null
		}
		else {
			return <h2>Les plus consultées</h2>

		}
	}

	const newInput = (element) => {
		if(element.target.id === 'mobileInputDepart') {
			props.setUserInputDepart(element.target.value)
		}
		else if(element.target.id === 'mobileInputArrivee') {
			props.setUserInputArrivee(element.target.value)
		}
	}

	// eslint-disable-next-line
	const [_, forceUpdate] = useReducer((x) => x + 1, 0);
	useEffect(() => {
		if(props.researchDone) {
			props.setActiveArrivee(false)
		}
		forceUpdate()
	}, [props])
	

	useEffect(() => {
		const fetchData = async () => {	
			let result;

			if(!props.researchDone) {
				if(props.userInputDepart && props.userInputDepart !== '') {
					setLoadingBubbles(true)
					result = await axios(`https://api.comparatrip.eu/cities/autocomplete/?q=${props.userInputDepart}`,)
					setData(result.data);
					setLoadingBubbles(false)					
				}
				else if (props.userDepart && props.userInputArrivee === '') {
					setLoadingBubbles(true)
					result = await axios(`https://api.comparatrip.eu/cities/popular/from/${props.userDepart.toLowerCase()}/5`,)
					setData(result.data);
					setLoadingBubbles(false)
				}
				else if (props.userInputArrivee && props.userInputArrivee !== '') {
					setLoadingBubbles(true)
					result = await axios(`https://api.comparatrip.eu/cities/autocomplete/?q=${props.userInputArrivee}`,)
					setData(result.data);
					
					setLoadingBubbles(false)
				}
				else if (!props.userDepart && !props.userInputDepart && !props.userInputArrivee){
					setLoadingBubbles(true)
					result = await axios('https://api.comparatrip.eu/cities/popular/5 ',)
					setData(result.data);
					setLoadingBubbles(false)	
				}
			}
				
		}

		

		fetchData().then(() => {
			props.setIsLoading(false)
		})
		

	}, [props])
	
	

	return (

			<SugWrapper active={props.active}  id="depart">
				{/* <IoMdArrowDropleft css={`color: #fefefe;`}/> */}
				<Header>
					{title()}
					{props.isFocus === 'start' ? <h3>Gare de départ</h3> : <h3>Gare d'arrivée</h3>}
					<button>Annuler</button>
				</Header>
				{props.isFocus === 'start' ? (
					<UserInput value={props.userInputDepart} id="mobileInputDepart" onChange={newInput}/>
				) : (
					<UserInput value={props.userInputArrivee} id="mobileInputArrivee" onChange={newInput}/>
				)}

				{loadingBubbles ? (
					<ReactLoading type='bubbles' color='black' height={167} width={95} css={`display: ${({active}) => active ? 'flex' : 'none'};`}/>

				) : (
					<ul id="depart">
						{data.map((element, index) => (
							<li key={index} tabIndex="0" onClick={handleClick} id={props.id}>{element.local_name}</li>
						))}
						
					</ul>
				)}
				
				
			</SugWrapper>


	)
}

export default Suggest



const SugWrapper = styled.div`
	width: 400px;
	height: 290px;
	margin: 1rem 0 ;
	background: white;
	border-radius: 5px;
	display: ${({active}) => active ? 'flex' : 'none'}; 
	flex-direction: column;
	padding: 1rem;
	box-shadow: -1px -1px 10px grey;
	overflow: auto;

	h2 {
		font-size: 1rem;
		text-align:center;
		margin-bottom: 1rem;
		padding: 0 1rem;
	}
	ul {
		margin: 0 1rem;
	}
	li {
		margin: 0.5rem 0;	
		cursor: pointer;
		padding: 0.35rem;
		list-style: none;
		border-radius: 4px;

		&:hover {
			background-color: rgba(136, 232, 252, 1);
		}
	}

	@media screen and  (max-width: 1200px){
		width: 50vw;
		margin: 0.5rem 0;

		ul {
			margin: 0;
    		padding: 0;
		}
	}

	@media screen and (max-width: 768px){
		position: fixed;
		margin: auto;
		width: 100%;
		height: 100%;
		z-index: 100;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;

		
	}

`

const UserInput = styled.input`
	display: none;
	box-sizing: border-box;
	border: 3px solid #ccc;
	&:focus {
		border: blue solid 3px;
		outline: none;
	}

	@media screen and (max-width: 768px){
		display: flex;

		
	}
`

const Header = styled.div`
	display: flex;
    justify-content: center;
    align-self: center;
    width: 100%;

	h2 {
		display: flex;

		@media screen and (max-width: 768px){
			display: none;
		}
	}

	h3 {
		display: none;

		@media screen and (max-width: 768px){
			display: flex;
		}
	}

	button {
		display: none;
		position: fixed;
    	right: 30px;

		@media screen and (max-width:768px){
			display:flex;
		}
	}
`
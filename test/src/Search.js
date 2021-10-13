import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import SearchBg from './email.jpg'
import Suggest from './Suggest'
import ReactLoading from 'react-loading';
import {BsArrowLeftRight} from 'react-icons/bs'
import Button from 'react-bootstrap/Button';

const Search = () => {

	const [activeDepart, setActiveDepart] = useState(false)
	const [activeArrivee, setActiveArrivee] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [userInputDepart, setUserInputDepart] = useState('')
	const [userInputArrivee, setUserInputArrivee] = useState('')
	const [userDepart, setUserDepart] = useState(undefined)
	const [userArrivee, setUserArrivee] = useState('')
	const [researchDone, setResearchDone] = useState(false)
	const [arrivFocus, setArrivFocus] = useFocus()
	const [departFocus, setDepartFocus] = useFocus()
	const [nextFocus, setNextFocus] = useFocus()
	const [isFocus, setIsFocus] = useState('')
	// eslint-disable-next-line
	const [suggest, setSuggest] = useState('start')

	const showSuggest = (prev) => {
		setSuggest((prev) => !prev)

		if (researchDone) {
			setActiveDepart(false)
			setActiveArrivee(false)
		}
		else if (userDepart && userArrivee){
			setResearchDone(true)
			setActiveDepart(false)
			setActiveArrivee(false)
			setNextFocus()
		}
				
		else if(prev.target.id === 'depart'){
			setActiveDepart(true)
			setIsFocus('start')
			setActiveArrivee(false)
		}
		else if (prev.target.id === 'arrivee' || isFocus === 'end'){
			setActiveArrivee(true)
			// setIsFocus('end')
			setActiveDepart(false)
		}
		else if (prev.target.localName === 'li' && prev.target.id === 'departid'){
			setActiveDepart(false)
			setActiveArrivee(true)
		}
		else if (prev.target.localName === 'li' && prev.target.id === 'arriveeid'){
			setActiveDepart(true)
			setActiveArrivee(false)
		}
		else if(prev.target.id === 'mobileInputDepart' || prev.target.id === 'mobileInputArrivee'){
			return
		}
	
		
		else {
			setActiveDepart(false)
			setActiveArrivee(false)
		}
		
	}

	const handleChange = (data) => {
		setResearchDone(false)
		if (data.target.id === 'depart') {
			setActiveDepart(true)
			setUserDepart(data.target.value)
			setUserInputDepart(data.target.value)
		}
		else if (data.target.id === 'arrivee') {
			setUserArrivee(data.target.value)
			setUserInputArrivee(data.target.value)
			console.log(userInputArrivee)
		}
		
	}

	const changeDirections = () => {
		let prevDepart = userDepart
		setUserDepart(userArrivee)
		setUserArrivee(prevDepart)
	}

	const handleReset = () => {
		setUserDepart('')
		setUserInputDepart('')
		setUserArrivee('')
		setUserInputArrivee('')
		setResearchDone(false)
		setDepartFocus()
		setIsFocus('start')
		setActiveDepart(true)
	}

	useEffect(() => {
		setIsLoading(true)
	}, [])

	return (
		<SearchContainer>
			<HeaderContainer>
				<Heading>
					<Title >Test pour Tictactrip</Title>
				</Heading>
				<Wrapper>
					Objectif : 
					<Description>
						Recréer une barre de recherche le plus proche possible de celle de https://www.trainline.eu.
					</Description>
				</Wrapper>
			</HeaderContainer>
			<SearchContent onClick={showSuggest}>
				<h1>Trouvez le meilleur train, en toute simplicité</h1>
				<p>Sortez du train-train quotidien pour profiter d'un été 100% voyage</p>
				
				{isLoading ? (
					<ReactLoading type='spin' color='black' height={167} width={95} css={`display: ${({active}) => active ? 'flex' : 'none'};`}/>
				) : (
					<>
					<SearchWrapper>
						<ContentWrapper>
							<form action="#">
								<FormWrap id="depart">
									<label htmlFor="text" id="depart">
										Départ
										<input type="text" placeholder="Gare de départ" id="depart" ref={departFocus} required onChange={handleChange} value={userDepart || ''}/>
									</label>
								</FormWrap>
								
							</form>
							<Suggest active={activeDepart} 
								setIsLoading={setIsLoading} 
								userInputDepart={userInputDepart} 
								id="departid" 
								userDepart={userDepart} 
								userArrivee={userArrivee}
								setUserDepart={setUserDepart}  
								setUserInputDepart={setUserInputDepart}
								setUserArrivee={setUserArrivee} 
								setArrivFocus={setArrivFocus} 
								setActiveArrivee={setActiveArrivee} 
								setActiveDepart={setActiveDepart}
								researchDone={researchDone} 
								setResearchDone={setResearchDone}
								setNextFocus={setNextFocus}
								suggest='start'
								setSuggest={setSuggest}
								isFocus={isFocus}
								setIsFocus={setIsFocus}
							/>
						</ContentWrapper>

						<Arrows onClick={changeDirections}><BsArrowLeftRight/></Arrows>
						
						<ContentWrapper id="arrivee">
							<form action="#" id="arrivee">
								<FormWrap id="arrivee">
									<label htmlFor="text" id="arrivee">
										Arrivée
										<input type="text" placeholder="Gare d'arrivée" id="arrivee" ref={arrivFocus} onFocus={showSuggest} onChange={handleChange} value={userArrivee ||''}required/>
									</label>
								</FormWrap>
								
							</form>
							<Suggest active={activeArrivee} 
								setActiveArrivee={setActiveArrivee} 
								setActiveDepart={setActiveDepart}
								isLoading={isLoading} 
								id='arriveeid'
								setIsLoading={setIsLoading} 
								setDepartFocus={setDepartFocus}
								userDepart={userDepart} 
								userArrivee={userArrivee}
								userInputDepart=''
								setUserArrivee={setUserArrivee} 
								researchDone={researchDone} 
								setResearchDone={setResearchDone}
								setNextFocus={setNextFocus}
								suggest='end'
								setSuggest={setSuggest}
								userInputArrivee={userInputArrivee} 
								setUserInputArrivee={setUserInputArrivee}
								isFocus={isFocus}
								setIsFocus={setIsFocus}
							/>
							
						</ContentWrapper>
						
					</SearchWrapper>
					<Btn>
						<Button variant="danger" onClick={handleReset} id="depart">Reset</Button>
					</Btn>

					<ContentWrapper>
							<form action="#">
								<FormWrap>
									<label htmlFor="text">
										Next step
										<input type="text" placeholder="Next Step"ref={nextFocus}/>
									</label>
								</FormWrap>
								
							</form>
							
						</ContentWrapper>
					
				</>
					
				)}
				
				
				
			</SearchContent>
		</SearchContainer>

	)
}

export default Search

const useFocus = () => {
	const htmlElRef = useRef(null)
	const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
	
	return [ htmlElRef, setFocus ] 
}

const SearchContainer = styled.div`
	background: linear-gradient(
		180deg, 
		rgba(0,0,0,0.5) 0%, 
		rgba(0,0,0,0.5) 35%, 
		rgba(0,0,0,0.1) 100%
		),
		url(${SearchBg}) no-repeat center;
	background-size: cover;
	height: 100vh;
	width: 100%;
	padding: 5rem calc((100vw - 1300px) / 2);
	color: black;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	@media screen and (max-width: 1000px){
		height: 100%; 
		padding: 0;
	}
`
const SearchContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background: rgba(255,255,255,0.8);
	padding: 1rem;
	border-radius: 5px;
	max-width: 90vw;

	h1{
		text-align: center;
		margin-bottom: 1rem;
		font-size: clamp(1rem, 5vw, 3rem);
		padding: 0 1rem;
	}

	p{
		text-align: center;
		font-size: clamp(1rem, 2.5vw, 1.5rem);
		padding: 0 1rem;
		margin-bottom: 2rem;
	}

	form{
		z-index: 10;
		align-self: self-start;
		margin: 1rem 5rem;

		&:focus-within {
			outline: blue solid 1px;
			background: white;
			border-radius: 5px;
		}
		
		@media screen and (max-width: 1200px){
			margin: 0.5rem 0.5rem;
		}



		@media screen and (max-width: 768px){
			margin: 0;
			max-width: 80vw;
		}

	}
`
const Btn = styled.div`
	align-self: flex-start;
	margin: 2rem 5rem;

	@media screen and (max-width: 768px){
		margin: 1rem;
	}
`

const SearchWrapper = styled.div`
	display: flex;
    flex-direction: column;
    align-self: self-start;
	
`

const ContentWrapper = styled.div`
	align-self: flex-start;
	display: flex;
	height: 12vh;

	@media screen and (max-width: 1000px){
		margin: 1rem 0;
	}
	@media screen and (max-width: 768px){
		flex-direction: column;
		display: flex;
    	justify-content: center;
	}

	
`

const Arrows = styled.div`
    text-align: center;
    position: relative;
	cursor: pointer;

	&:hover {
		background: rgba(0,0,0,0.1)
	}

	svg {
		cursor: pointer;
	}
`

const FormWrap = styled.div`

	background: #fefefe;
	color: black;
	padding: 1rem 1.5rem; 
	border-radius: 5px;
	width: 350px;
	box-sizing: content-box;

	&:hover {
		background: rgb(153 149 149 / 30%);
		}
	input{
		margin-left: 1.5rem;
		outline: none;
		
		height: 48px;
		background: inherit;
		border: none;
		margin-right: 1rem;
		
	}

	@media screen and (max-width: 1000px){
		width: 250px;
	}

	@media screen and (max-width: 768px){
		display: flex;
		flex-direction: column;
		padding: 0 1rem;

		max-width: 70vw;
		input {
			margin: 0;
		}

		label {
			display: flex;
    		flex-direction: column;
			margin: 0;
		}
	}
`

const HeaderContainer = styled.div`
	width: 100%;
	color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 4rem calc((100vw - 1300px) / 2);
	margin-top: -25vh;

	@media screen and (max-width: 1000px) {
		margin-top: 0;
	}
`
const Heading = styled.h1`
	text-align: start;
	font-size: clamp(1.5rem, 5vw, 2rem);
	margin-bottom: 3rem;
	padding: 0 2rem;
`
const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 10px;
	margin: 0 15rem;

	@media screen and  (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`
const Title = styled.div`
	font-size: clamp(1rem, 2.5vw, 1.5rem);
	margin-bottom: 0.5rem;
`
const Description = styled.div``
import styled from 'styled-components'
import {useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'

function Search() {

  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e)=>{
    e.preventDefault();
    navigate("/searched/" + input)
  }

  return (
    <FormStyle onSubmit={submitHandler}>
        <FaSearch></FaSearch>
        <input onChange={(e)=> setInput(e.target.value)} type='text' value={input}></input>
    </FormStyle>
  )
}

const FormStyle = styled.form`
  display: flex;
  justify-content: center;
  position: relative;

  input{
    border: none;
    background: linear-gradient(35deg, #6a6a6a, #313131);
    font-size: 1.5rem;
    color: #ffffff;
    padding: 0.8rem 2rem;
    border-radius: 1rem;
    outline: none;
    /* position: relative; */
    width: 50%;
  }

  svg{
    position: absolute;
    z-index: 30;
    top: 50%;
    left: 25%;
    transform: translate(100%, -50%);
    color: white;
  } 
`

export default Search
import React, {useState} from 'react';

import api from '../../services/api';

import {Link, useHistory} from 'react-router-dom';

import './styles.css';

import {FiLogIn} from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png';

export default function Logon(){

    const history = useHistory();

    async function HandleLogon(e){
        e.preventDefault();
        
        try{
            const response = await api.post('session', {id});
            
            localStorage.setItem('ong_id', id);
            localStorage.setItem('ong_name', response.data.name);

            history.push('/profile');
        } catch(error){
            alert(`Falha no logon, tente novamente.`);
        }
    }

    const [id, setId] = useState('');

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Logo"/>
                <form onSubmit={HandleLogon}>
                    <h1>Faça seu Logon</h1>
                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button  className="button" type="submit">Entrar</button>

                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}
import React, {useState, useEffect} from 'react';

import api from '../../services/api';

import {Link, useHistory} from 'react-router-dom';

import {FiPower, FiTrash2} from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg'


export default function Profile(){

    const [cases, setCases] = useState([]);

    const history = useHistory();

    const ongId = localStorage.getItem('ong_id');
    const ongName = localStorage.getItem('ong_name');

    useEffect(() =>{
        api.get('profile', {
            headers:{
                Authorization: ongId,
            }
        }).then(response =>{
            setCases(response.data);
        });
    }, [ongId]);

    async function HandleDeleteCase(id){
        try{
            await api.delete(`cases/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            setCases(cases.filter(caso => caso.id !== id));
        } catch(error){
            alert('Erro ao deletar caso.');
        }
    }

    function HandleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Logo"/>
                <span>Bem vindo, {ongName}!</span>

                <Link className="button" to="/cases/new">Cadastrar novo caso</Link>

                <button type="button" onClick={HandleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {cases.map(caso =>(
                    <li key={caso.id}>
                        <strong>CASO:</strong>
                        <p>{caso.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{caso.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(caso.value)}</p>

                        <button type="button" onClick={() => HandleDeleteCase(caso.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
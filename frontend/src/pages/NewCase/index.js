import React, {useState} from 'react';

import api from '../../services/api';

import {Link, useHistory} from 'react-router-dom';

import './styles.css';

import {FiArrowLeft} from 'react-icons/fi';

import logoImg from '../../assets/logo.svg'

export default function NewCase(){

    const ongId = localStorage.getItem('ong_id');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    async function HandleCreateCase(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try{
            await api.post('cases', data, {
                headers:{
                    Authorization: ongId
                }
            });

            alert('Caso criado com sucesso!');

            history.push('/profile');
        } catch(error){
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o texto detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={HandleCreateCase}>
                    <input 
                        placeholder="Título do caso" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição do caso" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais" 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
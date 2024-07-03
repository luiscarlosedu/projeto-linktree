import { FormEvent, useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { Input } from "../../components/Input"

import { FiTrash } from "react-icons/fi";

import { db } from "../../services/firebaseconnection";
import {
    addDoc, 
    collection,
    onSnapshot,
    query,
    orderBy,
    doc,
    deleteDoc
 } from "firebase/firestore";

interface LinkProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

export function Admin() {
    
    const [nameInput, setNameInput] = useState('');
    const [urlInput, setUrlInput] = useState('');
    const [textColorInput, setTextColorInput] = useState('#f1f1f1');
    const [backgroundColorInput, setBackgroundColorInput] = useState('#000');

    const [links, setLinks] = useState<LinkProps[]>([]);

    useEffect(() => {
        const linksRef = collection(db, 'links');
        const queryRef = query(linksRef, orderBy("created", 'asc'));

        const unsub = onSnapshot(queryRef, (snapshot) => {
            let lista = [] as LinkProps[];

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
            })

            setLinks(lista);
        })

        return () => {
            unsub();
        }

    }, []);

    function handleRegister(e: FormEvent) {
        e.preventDefault();
        
        if(nameInput === '' || nameInput === '') {
            alert('Preencha todos os campos!')
            return;
        }

        addDoc(collection(db, 'links'), {
            name: nameInput,
            url: urlInput,
            bg: backgroundColorInput,
            color: textColorInput,
            created: new Date()
        })
        .then(() => {
            console.log('Cadastrado com sucesso!')
            setNameInput('');
            setUrlInput('');
        }) 
        .catch((error) => {
            console.error(error);
        })
    }

    async function handleDeleteLink(id: string) {
        const docRef = doc(db, 'links', id);
        await deleteDoc(docRef);
    }

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>

            <form className="flex flex-col mt-8 mb-3 w-full max-w-xl" onSubmit={handleRegister}>

                <label htmlFor="link" className="text-white font-medium mt-2 mb-2">Nome do Link</label>
                <Input 
                id="link" 
                placeholder="Digite seu link"
                value={nameInput}
                onChange={ (e) => setNameInput(e.target.value) }
                />

                <label htmlFor="url" className="text-white font-medium mt-2 mb-2">Nome do Link</label>
                <Input 
                id="url" 
                type="url"
                placeholder="Digite a URL"
                value={urlInput}
                onChange={ (e) => setUrlInput(e.target.value) }
                />

                <section className="flex my-4 gap-5">
                    
                    <div className="flex gap-2 items-center">
                        <label htmlFor="bgLink" className="text-white font-medium mt-2 mb-2">Cor do Link</label>
                        <input 
                        id="bgLink"
                        type="color"
                        value={textColorInput}
                        onChange={(e) => setTextColorInput(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 items-center">
                        <label htmlFor="bgLink" className="text-white font-medium mt-2 mb-2">Fundo do Link</label>
                        <input 
                        id="colorLink"
                        type="color"
                        value={backgroundColorInput}
                        onChange={(e) => setBackgroundColorInput(e.target.value)}
                        />
                    </div>

                </section>

                {nameInput !== '' && (
                    <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
                    <label htmlFor="" className="text-white font-medium mt-2 mb-3">Veja como está ficando!!</label>    
                    <article
                    className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-red-900 rounded px-1 py-3"
                    style={{marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput}}
                    >
                        <p className="font-medium" style={{color: textColorInput}}>{nameInput}</p>
                    </article>
                    </div>
                )}

                <button 
                type='submit'
                className="bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center mb-7"
                >
                    Cadastrar
                </button>

            </form>

            <h2 className="text-white font-bold mb-4 text-2xl">
                Meus Links
            </h2>

            {links.map((item) => (
                <article
                key={item.id}
                className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
                style={{backgroundColor: item.bg, color: item.color}}
                >
                    <p>{item.name}</p>
                    <div>
                        <button
                        className="border border-dashed p-1 rounded"
                        onClick={() => handleDeleteLink(item.id)}
                        >
                            <FiTrash size={18} color="#FFF" />
                        </button>
                    </div>
                </article>
            ))}

        </div>
    )
}
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Social } from "../../components/Social"

import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"

import { db } from "../../services/firebaseconnection"
import {
    getDocs,
    collection,
    orderBy,
    query,
    doc,
    getDoc
} from 'firebase/firestore'

interface LinkProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

interface SocialLinksProps {
    facebook: string;
    instagram: string;
    youtube: string;
}
 
export function Home() {
    const [links, setLinks] = useState<LinkProps[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();
    
    useEffect(() => {
        function loadLinks() {
            const linksRef = collection(db, 'links');
            const queryRef = query(linksRef, orderBy('created', 'asc'));

            getDocs(queryRef)
            .then((snapshot) => {
                let lista: LinkProps[] = [];
                snapshot.forEach((item) => {
                    lista.push({
                        id: item.id,
                        name: item.data().name,
                        url: item.data().url,
                        bg: item.data().bg,
                        color: item.data().color      
                    })
                })

                setLinks(lista);
            })
            .catch((error) => {
                console.error(error);
            })
        }

        loadLinks();
    }, []);

    useEffect(() => {
        function loadSocialLinks() {
            const docRef = doc(db, 'social', 'link');
            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data() !== undefined) {
                    setSocialLinks({
                        facebook: snapshot.data()?.facebook,
                        instagram: snapshot.data()?.instagram,
                        youtube: snapshot.data()?.youtube
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            })
        }

        loadSocialLinks();
    }, []);

    return(
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl  text-3xl font-bold text-white mt-20">Luís Eduardo</h1>
            <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

            <main className="flex flex-col w-11/12 max-w-xl text-center">
                
                {links.map((item) => (
                    <section
                    style={{backgroundColor: item.bg}}
                    key={item.id}
                    className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
                        <a href={item.url} target="_blank">
                            <p 
                            style={{color: item.color}}
                            className="text-base md:text-lg" >
                                {item.name}
                            </p>
                        </a>
                    </section>
                ))}

                {socialLinks && Object.keys(socialLinks).length > 0 && (
                    <footer>
                        <div>
                            <Link to='/login' className="text-black bg-white px-6 py-1 rounded-sm">Login</Link>
                        </div>
                        <div className="flex justify-center gap-3 my-4">
                            <Social url={socialLinks?.facebook}>
                                <FaFacebook size={25} color="#FFF"/>
                            </Social>
                            <Social url={socialLinks?.instagram}>
                                <FaInstagram size={25} color="#FFF"/>
                            </Social>
                            <Social url={socialLinks?.youtube}>
                                <FaYoutube size={25} color="#FFF"/>
                            </Social>
                        </div>
                </footer>
                )}

            </main>

        </div>
    )
}
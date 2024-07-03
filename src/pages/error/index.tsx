import { Link } from "react-router-dom";

export function ErrorPage() {
    return (
        <div
        className="flex w-full justify-center items-center flex-col text-white min-h-screen"
        >
            <h1 className="font-bold text-8xl mb-4">404</h1>
            <p className="italic text-1xl mb-4">Você acessou uma página que não existe!</p>

            <Link 
            className="bg-gray-50/20 py-1 px-4 rounded-md"
            to='/'>Home</Link>
        </div>
    )
}
export default function Header() {
    return (
        <header className="w-full h-14 flex flex-row items-center bg-gray-900 sticky top-0">
            <a href="/" className="flex flex-row text-3xl font-bold gap-1 ml-10 cursor-pointer hover:translate-y-[-3px] transition-transform ease-in-out duration-300">
                <p className="text-red-500">S</p>
                <p className="text-orange-500">M</p>
                <p className="text-yellow-500">A</p>
                <p className="text-green-500">R</p>
                <p className="text-blue-500">T</p>
            </a>
        </header>
    );
}
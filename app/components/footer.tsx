"use client";
export default function Footer() {
    function clearData() {
        localStorage.clear();
        window.location.reload();
    }
    return (
        <footer className="w-full h-14 flex-row bg-gray-900 flex flex-row justify-center items-center fixed bottom-0">
            <p>Created by ConstintCreations | Source on <a className="text-blue-400 hover:border-b hover:border-blue-400" href="https://github.com/ConstintCreations/SMART" target="_blank">Github</a></p>
            <button onClick={clearData} className="cursor-pointer fixed right-10 bottom-0 h-14 flex items-center text-gray-400 hover:text-gray-300 transition-colors duration-300 ease-in-out">Clear Data</button>
        </footer>
    )
}
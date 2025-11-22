import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="flex flex-row justify-center items-center text-7xl font-bold mt-15 gap-1">
        <p className="text-red-500">S</p>
        <p className="text-orange-500">M</p>
        <p className="text-yellow-500">A</p>
        <p className="text-green-500">R</p>
        <p className="text-blue-500">T</p>
      </h1>
      <h2 className="mt-4 text-2xl text-center text-gray-400">
        Generate SMART goals
      </h2>
    </div>
  );
}

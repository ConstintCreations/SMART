import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="flex flex-row justify-center items-center text-7xl font-bold mt-29 gap-1">
        <p className="text-red-500">S</p>
        <p className="text-orange-500">M</p>
        <p className="text-yellow-500">A</p>
        <p className="text-green-500">R</p>
        <p className="text-blue-500">T</p>
      </h1>
      <h2 className="text-2xl text-center text-gray-400">
        Generate SMART goals
      </h2>
      <h3 className="text-3xl mt-10 text-gray-300">
        Why SMART goals?
      </h3>
      <p className="text-lg text-center max-w-2xl px-4 text-gray-400">
        The SMART framework helps you set clear and achievable goals by being Specific, Measurable, Achievable, Relevant, and Time-bound. They make it easier to stay focused and motivated while working towards your goals.
      </p>
      <Link href="/goals" className="mt-5 bg-gray-800 text-gray-400 rounded-lg px-5 py-3 border-2 border-gray-600 hover:bg-blue-700 hover:border-blue-500 hover:text-blue-200 transition-all ease-in-out duration-300">
        Get Started!
      </Link>
    </div>
  );
}

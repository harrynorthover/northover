import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg mb-6">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-4 mt-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;

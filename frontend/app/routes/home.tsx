import { useEffect } from "react";
import type { MetaFunction } from "react-router";
import { useAnimalStore } from "../store/useAnimalStore";
import { AnimalCard } from "../components/AnimalCard";

export const meta: MetaFunction = () => {
  return [
    { title: "Animal Welfare Donation Portal" },
    {
      name: "description",
      content:
        "Help animals in need by making donations for their medical treatment",
    },
  ];
};

export default function Home() {
  const { animals, loading, error, fetchAnimals } = useAnimalStore();

  useEffect(() => {
    fetchAnimals();
  }, [fetchAnimals]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading animals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold mb-2">Error</div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={fetchAnimals}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-purple-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">
            Animal Welfare Donation Portal
          </h1>
          <p className="text-lg md:text-xl font-semibold mb-4 max-w-3xl mx-auto">
            Every donation makes a difference
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {animals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No animals found.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Animals Waiting for Your Support
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Each of these animals has a unique story and specific medical
                needs. Your donation can help provide the care they deserve.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {animals.map((animal) => (
                <AnimalCard key={animal._id} animal={animal} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

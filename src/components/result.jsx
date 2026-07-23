function Result({ loading, prediction }) {

  if (loading) {
    return (
      <div className="mt-8 flex flex-col items-center">

        <div className="w-8 h-8 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>

        <p className="mt-4 text-lg text-gray-700">
          Identifying fish species...
        </p>

      </div>
    );
  }

  if (!prediction) {
    return null;
  }

  return (
  <div className="mt-8 w-full max-w-md bg-white rounded-2xl shadow-lg p-6">

    {/* Title */}
    <h2 className="text-2xl font-bold text-center text-blue-700">
      {prediction.species}
    </h2>

    {/* Scientific Name */}
    <p className="text-center italic text-gray-500 mt-1">
      {prediction.scientific_name}
    </p>

    {/* Accuracy */}
    <p className="text-center font-semibold text-green-700 mt-3">
      Accuracy: {prediction.accuracy.toFixed(2)}%
    </p>

    <hr className="my-5" />

    {/* Description */}
    <p className="text-gray-700 leading-relaxed">
      {prediction.description}
    </p>

    {/* Features */}
    <h3 className="font-semibold text-lg mt-5 mb-2">
      Typical Characteristics
    </h3>

    <ul className="list-disc list-inside space-y-1 text-gray-700">
      {prediction.features.map((feature, index) => (
        <li key={index}>
          {feature}
        </li>
      ))}
    </ul>

    {/* Extra Info */}
    <div className="mt-5 space-y-2 text-gray-700">

      <p>
        <strong>Habitat:</strong> {prediction.habitat}
      </p>

      <p>
        <strong>Diet:</strong> {prediction.diet}
      </p>

      <p>
        <strong>Average Length:</strong> {prediction.average_length}
      </p>

    </div>

  </div>
);
}

export default Result;
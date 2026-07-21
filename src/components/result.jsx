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
    <div className="mt-8 text-center">

      <h2 className="text-2xl font-semibold">
        Prediction
      </h2>

      <p className="mt-4 text-xl">
        {prediction.species}
      </p>

      <p className="mt-2 text-lg text-green-700 font-medium">
        <p>{prediction.accuracy.toFixed(2)}% Accuracy</p>
      </p>

    </div>
  );
}

export default Result;
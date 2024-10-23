import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../Image.jsx";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('/places');
        setPlaces(response.data);
      } catch (err) {
        setError(err.message); // Capture error message
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchPlaces();
  }, []);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>; // Display a loading message
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>; // Display an error message
  }

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.isArray(places) && places.length > 0 ? (
        places.map(place => (
          <Link key={place._id} to={'/place/' + place._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.[0] && (
                <Image className="rounded-2xl object-cover aspect-square" src={place.photos[0]} alt={place.title || "Place image"} />
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm text-gray-500">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span> per night
            </div>
          </Link>
        ))
      ) : (
        <div>No places available.</div> // Message when there are no places
      )}
    </div>
  );
}

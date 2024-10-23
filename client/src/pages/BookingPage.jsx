import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get('/bookings');
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        } else {
          setError('Booking not found'); // Handle case where booking is not found
        }
      } catch (err) {
        setError('Failed to fetch booking data'); // Handle API errors
      } finally {
        setLoading(false); // End loading
      }
    };

    if (id) {
      fetchBooking(); // Fetch booking only if id exists
    }
  }, [id]);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>; // Display loading message
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  // If no booking found
  if (!booking) {
    return <div>No booking found.</div>; // Display message for no booking
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}

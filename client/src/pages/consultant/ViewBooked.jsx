import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance"; // Sử dụng axiosInstance đã có interceptor
import Sidebar from "../../components/ConsultantSidebar";

const ViewBooked = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/booking-requests/my-bookings");
        const bookingsData = response.data.bookings || [];
        
        // Lấy feedback cho từng dịch vụ
        const bookingsWithFeedback = await Promise.all(
          bookingsData.map(async (booking) => {
            if (booking.serviceID._id) {
              try {
                const feedbackRes = await axios.get(`/api/feedbacks/service/${booking.serviceID._id}`);                
                return { ...booking, feedback: feedbackRes.data[0].consultantComment || "No feedback yet", rating: feedbackRes.data[0].consultantRating || "N/A" };
              } catch {
                return { ...booking, feedback: "No feedback yet ", rating: "N/A" }; 
              }
            }
            return { ...booking, feedback: "No feedback yet", rating: "N/A" };
          })
        );

        const handleSort = (column) => {
          const newSortOrder = sortBy === column && sortOrder === "asc" ? "desc" : "asc";
        
          const getValue = (obj, path) => path.split(".").reduce((o, key) => (o ? o[key] : ""), obj);
        
          const sortedData = [...bookings].sort((a, b) => {
            const valA = getValue(a, column)?.toString().toLowerCase() || "";
            const valB = getValue(b, column)?.toString().toLowerCase() || "";
        
            return newSortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
          });
        
          setBookings(sortedData);
          setSortBy(column);
          setSortOrder(newSortOrder);
        };
        setBookings(bookingsWithFeedback);
      } catch (error) {
        setError("Failed to load bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
const handleSort = (column) => {
    const newSortOrder = sortBy === column && sortOrder === "asc" ? "desc" : "asc";
    const sortedData = [...bookings].sort((a, b) => {
      const valA = a[column]?.toString().toLowerCase() || "";
      const valB = b[column]?.toString().toLowerCase() || "";

      return newSortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

    setBookings(sortedData);
    setSortBy(column);
    setSortOrder(newSortOrder);
  };
  return (
    <div className={`flex transition-opacity duration-500 ${loading ? "opacity-50" : "opacity-100"}`}>
      <Sidebar />
      <div className="ml-2 p-6 w-full">
        <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
        {error && <p className="text-red-500">{error}</p>}
        {bookings.length === 0 ? (
          <p>No bookings assigned to you yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-md">
              <thead>
              <tr className="bg-gray-100">
    {[
      { key: "serviceID.name", label: "Service" },
      { key: "customerID.firstName", label: "Customer" },
      { key: "date", label: "Date" },
      { key: "time", label: "Time" },
      { key: "status", label: "Status" },
      { key: "feedback", label: "Feedback" },
      { key: "rating", label: "Rating" },
    ].map(({ key, label }) => (
      <th
        key={key}
        className="border px-4 py-2 cursor-pointer hover:bg-gray-200 transition"
        onClick={() => handleSort(key)}
      >
        {label} {sortBy === key && (sortOrder === "asc" ? " 🔼" : " 🔽")}
      </th>
    ))}
  </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="text-center">
                    <td className="border px-4 py-2">{booking.serviceID?.name || "N/A"}</td>
                    <td className="border px-4 py-2">
                      {`${booking.customerID?.firstName || ""} ${booking.customerID?.lastName || ""}`.trim() || "N/A"}
                    </td>
                    <td className="border px-4 py-2">
                      {booking.date ? new Date(booking.date).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="border px-4 py-2">{booking.time || "N/A"}</td>
                    <td className="border px-4 py-2">{booking.status || "N/A"}</td>
                    <td className="border px-4 py-2">{booking.feedback || "N/A"}</td>
                    <td className="border px-4 py-2">
                       {booking.rating && booking.rating !== "N/A" 
                       ? "⭐".repeat(Math.round(booking.rating)) 
                        : "N/A"
  }
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
export default ViewBooked;
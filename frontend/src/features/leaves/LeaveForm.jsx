import { useState } from "react";
import { useDispatch } from "react-redux";
import { createLeave } from "./leavesSlice";

export default function LeaveForm() {
  const [form, setForm] = useState({ fromDate: "", toDate: "", reason: "" });
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(form.fromDate) > new Date(form.toDate)) {
      alert("Invalid date range");
      return;
    }
    dispatch(createLeave(form));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md space-y-4 w-[600px]"
    >
      <h3 className="text-xl font-semibold text-gray-700">Apply for Leave</h3>
      <div className="flex gap-4">
        <input
          type="date"
          name="fromDate"
          onChange={handleChange}
          required
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="date"
          name="toDate"
          onChange={handleChange}
          required
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <input
        type="text"
        name="reason"
        placeholder="Reason"
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
      >
        Apply Leave
      </button>
    </form>
  );
}

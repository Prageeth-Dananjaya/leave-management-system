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
    <form onSubmit={handleSubmit}>
      <input type="date" name="fromDate" onChange={handleChange} required />
      <input type="date" name="toDate" onChange={handleChange} required />
      <input
        type="text"
        name="reason"
        placeholder="Reason"
        onChange={handleChange}
        required
      />
      <button type="submit">Apply Leave</button>
    </form>
  );
}

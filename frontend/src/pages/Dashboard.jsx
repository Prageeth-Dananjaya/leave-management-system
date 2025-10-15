import LeaveForm from "../features/leaves/LeaveForm";
import LeaveList from "../features/leaves/LeaveList";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome, {user.name}
        </h2>
        <button
          onClick={() => dispatch(logoutUser())}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Logout
        </button>
      </div>
      <div className="space-y-6">
        {user.role === "employee" && <LeaveForm />}
        <LeaveList />
      </div>
    </div>
  );
}

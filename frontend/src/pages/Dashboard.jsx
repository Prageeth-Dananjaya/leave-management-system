import LeaveForm from "../features/leaves/LeaveForm";
import LeaveList from "../features/leaves/LeaveList";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <button onClick={() => dispatch(logoutUser())}>Logout</button>
      {user.role === "employee" && <LeaveForm />}
      <LeaveList />
    </div>
  );
}

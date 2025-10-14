import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaves } from "./leavesSlice";
import LeaveItem from "./LeaveItem";

export default function LeaveList() {
  const { list } = useSelector((state) => state.leaves);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeaves());
  }, [dispatch]);

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Employee</th>
          <th>From</th>
          <th>To</th>
          <th>Reason</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {list.map((leave) => (
          <LeaveItem key={leave.id} leave={leave} />
        ))}
      </tbody>
    </table>
  );
}

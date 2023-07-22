import React, { useEffect, useState } from "react";
import { getServerData } from "../helper/helper";

export default function ResultTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getServerData(
      "https://quiz-app-server-2ntr.onrender.com/api/result",
      (res) => {
        setData(res);
      }
    );
  }, []);
  return (
    <div>
      <table>
        <thead className="table-header">
          <tr className="table-row">
            <td>Name</td>
            <td>Attempts</td>
            <td>Earn Points</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>
          {!data ?? <div>No Records Found</div>}
          {data.map((data, index) => (
            <tr className="table-body" key={index}>
              <td>{data?.username || ""}</td>
              <td>{data?.attempts || 0}</td>
              <td>{data?.points || 0}</td>
              <td>{data?.achived || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

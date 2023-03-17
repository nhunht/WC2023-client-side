import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserApi from "../../apis/services/User";

const User = (props) => {
  const { user } = props;

  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await UserApi.gets(user);

      setUsers(response.users);
    };

    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>Email</th>
          <th>Name</th>
          <th>YOB</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {/* Users map */}
        {users &&
          users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.YOB}</td>
              <td>
                <div className="buttons are-small">
                  <Link to={`/edit-user/${user._id}`}>
                    <button className="button is-warning is-light ">
                      Edit
                    </button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        {/* Close map */}
      </tbody>
    </table>
  );
};

export default User;

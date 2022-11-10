import React from "react";
import {
  Navigate,
  NavLink,
  Outlet,
  useParams,
  useRoutes,
} from "react-router-dom";

function App() {
  const users = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
    { id: 4, name: "User 4" },
    { id: 5, name: "User 5" },
    { id: 6, name: "User 6" },
  ];

  const routes = [
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/users",
      element: <UsersLayout />,
      children: [
        {
          path: "",
          element: <UsersListPage />,
        },
        {
          path: ":userId",
          element: <User />,
        },
        {
          path: "edit/:userId",
          element: <EditUserPage />,
        },
        {
          path: "*",
          element: <Navigate to="" />,
        },
      ],
    },
  ];

  const element = useRoutes(routes);

  function MainPage() {
    return (
      <>
        <h1>Main Page</h1>
      </>
    );
  }

  function UsersLayout() {
    return (
      <>
        <h1>Users Layout</h1>
        <NavLink to={`../`}>Main Page</NavLink>
        <Outlet />
      </>
    );
  }

  function UsersListPage() {
    return (
      <>
        <h1>Users list Page</h1>
        <ul>
          {users.map((user) => {
            return (
              <li key={user.id}>
                <NavLink to={`${user.id}`}>{user.name}</NavLink>
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  function User() {
    const { userId } = useParams();

    return (
      <>
        <h1>User Page</h1>
        <ul>
          <li>
            <NavLink to="../">Users list Page</NavLink>
          </li>
          <li>
            <NavLink to={`../edit/${userId}`}>Edit this user</NavLink>
          </li>
        </ul>
        <h2>User id: {userId}</h2>
      </>
    );
  }

  function EditUserPage() {
    const { userId } = useParams();

    return (
      <>
        <h1>Edit User Page</h1>
        <ul>
          <li>
            <NavLink to={`../${userId}`}>User Page</NavLink>
          </li>
          <li>
            <NavLink to={`../${+userId + 1}`}>Another user</NavLink>
          </li>
          <li>
            <NavLink to="../">Users list Page</NavLink>
          </li>
        </ul>
        <h2>User id: {userId}</h2>
      </>
    );
  }

  return (
    <div>
      <h1>App layout</h1>
      <NavLink to={"users"}>Users list Page</NavLink>
      {element}
    </div>
  );
}

export default App;

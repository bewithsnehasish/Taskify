import React from "react";

function Cards() {
  const data = [
    {
      id: 1,
      title: "Complete React Documentation",
      description:
        "Read and understand the new React hooks introduced in the latest version.",
    },
    {
      id: 2,
      title: "Fix Bugs in User Authentication Module",
      description:
        "Address the bugs reported in the user authentication system and perform thorough testing.",
    },
    {
      id: 3,
      title: "Implement Dark Mode Toggle",
      description:
        "Add a feature to toggle between light and dark mode for better user experience.",
    },
    {
      id: 4,
      title: "Update Dependencies",
      description:
        "Update all project dependencies to their latest versions and ensure compatibility.",
    },
    {
      id: 5,
      title: "Create User Dashboard",
      description:
        "Design and implement the user dashboard with analytics and user activity insights.",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 p-4">
        {data &&
          data.map((items) => (
            <div key={items.id} className=" bg-gray-700 rounded p-4">
              <h2 className="text-xl font-semibold">{items.title}</h2>
              <p className="text-gray-300">{items.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Cards;

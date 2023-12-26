import React from "react";

const SingleQuixPage = ({ params }: { params: { id: string } }) => {
  return (
    <div style={{
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      borderRadius: "1rem",
      backgroundColor: "white",
      padding: "1rem",
    }}>
      <div>My Post: {params.id}</div>
    </div>
  );
};

export default SingleQuixPage;

import ViewSIngleQuizDash from "@/components/single-auiz/details/DetailsSIngleQuizDash";
import React from "react";

const SingleQuizPage = ({ params }: { params: { id: string } }) => {
  return (
    <div >
      <ViewSIngleQuizDash singleQuizId={params?.id} />
    </div>
  );
};

export default SingleQuizPage;

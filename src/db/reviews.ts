type ReviewUser = {
  title: string;
  name: string;
  img: string;
};

export type IReview = {
  user: ReviewUser;
  review: string;
  rating: number;
};
export const reviewsData: IReview[] = [
  {
    user: {
      title: "Student",
      name: "John Doe",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    review: "Great course! I learned a lot.Nam gravida elit a velit rutrum, eget dapibus ex elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce lacinia, ",
    rating: 5,
  },
  {
    user: {
      title: "Student",
      name: "Alice Smith",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    review: "Nam gravida elit a velit rutrum, eget dapibus ex elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce lacinia,The content was informative. Enjoyed the lessons.",
    rating: 4,
  },
  {
    user: {
      title: "Student",
      name: "Bob Johnson",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    review: " Would recommend.Nam gravida elit a velit rutrum, eget dapibus ex elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce lacinia, nunc sit amet tincidunt venenatis.",
    rating: 5,
  },
  {
    user: {
      title: "Student",
      name: "Eva Brown",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    review: "Nam gravida elit a velit rutrum, eget dapibus ex elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Helped me understand complex topics easily.",
    rating: 4,
  },
  {
    user: {
      title: "Student",
      name: "Mike Davis",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    review: "Nam gravida elit a velit rutrum, eget dapibus ex elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce lacinia, nunc sit amet tincidunt venenatis.",
    rating: 5,
  },
];

// Student feedback data types
export type IFeedback = {
  stars: number;
  feedback: string;
  percent: string;
};

export const feedbackData: IFeedback[] = [
  { percent: "70", stars: 5, feedback: "Excellent! Highly recommended." },
  { percent: "40", stars: 4, feedback: "Very good. Enjoyed the course." },
  { percent: "5", stars: 3, feedback: "Good, but room for improvement." },
  { percent: "1", stars: 2, feedback: "Not satisfied with the content." },
  {
    percent: "1",
    stars: 1,
    feedback: "Terrible experience. Wouldn't recommend.",
  },
];

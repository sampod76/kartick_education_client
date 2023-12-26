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
      img: "https://example.com/john-doe.jpg",
    },
    review: "Great course! I learned a lot.",
    rating: 5,
  },
  {
    user: {
      title: "Student",
      name: "Alice Smith",
      img: "https://example.com/alice-smith.jpg",
    },
    review: "The content was informative. Enjoyed the lessons.",
    rating: 4,
  },
  {
    user: {
      title: "Student",
      name: "Bob Johnson",
      img: "https://example.com/bob-johnson.jpg",
    },
    review: "The instructor was engaging. Would recommend.",
    rating: 5,
  },
  {
    user: {
      title: "Student",
      name: "Eva Brown",
      img: "https://example.com/eva-brown.jpg",
    },
    review: "Helped me understand complex topics easily.",
    rating: 4,
  },
  {
    user: {
      title: "Student",
      name: "Mike Davis",
      img: "https://example.com/mike-davis.jpg",
    },
    review: "Interesting and well-structured lessons.",
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

const ObjectId = require("mongodb").ObjectId;

const reviews = [
  {
    comment: "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    rating: 5,
    user: { _id: new ObjectId(), name: "John Doe" },        
  },
  {
    comment: "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    rating: 5,
    user: { _id: new ObjectId(), name: "John Doe" },
  },
  {
    comment: "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    rating: 5,
    user: { _id: new ObjectId(), name: "John Doe" },
  },
  {
    comment: "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    rating: 4,
    user: { _id: new ObjectId(), name: "John Doe" },
  },
  {
    comment: "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    rating: 3,
    user: { _id: new ObjectId(), name: "John Doe" },
  },
];

module.exports = reviews;
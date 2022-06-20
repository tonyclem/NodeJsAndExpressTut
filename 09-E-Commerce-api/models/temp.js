[
  {
    $match: {
      product: new ObjectId("62b0592ee81060fb4995c493"),
    },
  },
  {
    $group: {
      _id: null,
      averageRating: {
        $avg: "$rating",
      },
      numOfReviews: {
        $sum: 1,
      },
    },
  },
];

const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`
      }
    }
  },
  { timestamps: true }
);

connectionRequestSchema.pre("save", function () {
  const connectionRequest = this;

  //check if the from userId is same as toUserId
  // if(connectionRequest.fromUserId === connectionRequest.toUserId){}
  // which is wrong because the userId is not like normal userId it is mongodb ObjectId

  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You cannot send connection request to yourself.");
  }

  next();
});

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

const connectionRequestModel = new mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);

module.exports = connectionRequestModel;

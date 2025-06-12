import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
    enum: ['page_view', 'click', 'hover', 'time_spent', 'visit', 'conversion'],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  meta: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  }
});

export default mongoose.model('Event', EventSchema);

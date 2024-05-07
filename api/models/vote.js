import mongoose from 'mongoose';

const voteuserSchema = new mongoose.Schema(
  {
    
    username: {
      type: String,
      required: true,

    },

    points: {
      type: Number,
      default: 0
    }

  },
  
);

const voteuser = mongoose.model('voteuser', voteuserSchema);

export default voteuser;
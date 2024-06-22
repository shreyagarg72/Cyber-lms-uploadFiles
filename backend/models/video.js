// import mongoose from 'mongoose';

// const resourceSchema = new mongoose.Schema(
//     {
//         imgUrl: {
//             type: String,
//             required: true,
//         },
//         videoUrl: {
//             type: String,
//             required: true,
//         },
//     },
//     {
//         timestamps: true, // Automatically adds createdAt and updatedAt fields
//     }
// );

// const Resource = mongoose.model('Resource', resourceSchema);

// export default Resource;
// models/resource.js
import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    imgUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'resources', // Specify collection name
  }
);

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;

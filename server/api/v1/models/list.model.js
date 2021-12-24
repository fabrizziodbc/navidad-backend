import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
  listName: { type: String, required: true },
  /*  list: [{ type: Array, default: [] }], */
  author: { type: mongoose.Types.ObjectId, required: true, ref: 'user' },
  date: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
});
const List = mongoose.model('list', listSchema);
export default List;

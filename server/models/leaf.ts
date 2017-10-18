import * as mongoose from 'mongoose';

const leafSchema = new mongoose.Schema({
  name: String,
  size: String,
  color: String,
  count: Number
});

const Leaf = mongoose.model('Leaf', leafSchema);

export default Leaf;

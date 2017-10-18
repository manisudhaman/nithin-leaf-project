import Leaf from '../models/leaf';
import BaseCtrl from './base';

export default class LeafCtrl extends BaseCtrl {
  model = Leaf;

  getByColor = (req, res) => {
    this.model.aggregate([{"$group" : {_id:"$color", total:{$sum: "$count"}}}], (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }

  getBySize = (req, res) => {
    this.model.aggregate([{"$group" : {_id:"$size", total:{$sum: "$count"}}}], (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }

}

import Leaf from '../models/leaf';
import BaseCtrl from './base';

export default class LeafCtrl extends BaseCtrl {
  model = Leaf;

  getByColor = (req, res) => {
    this.model.aggregate([{"$group" : {_id:"$color", count:{$sum:1}}}], (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }

  getBySize = (req, res) => {
    this.model.aggregate([{"$group" : {_id:"$size", count:{$sum:1}}}], (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }

}

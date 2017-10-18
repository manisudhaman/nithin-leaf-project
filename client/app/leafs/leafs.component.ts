import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { LeafService } from '../services/leaf.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-leafs',
  templateUrl: './leafs.component.html',
  styleUrls: ['./leafs.component.scss']
})
export class LeafsComponent implements OnInit {

  leaf = {};
  leafs = [];
  isLoading = true;
  isEditing = false;

  addLeafForm: FormGroup;
  name = new FormControl('', Validators.required);
  size = new FormControl('', Validators.required);
  color = new FormControl('', Validators.required);
  count = new FormControl('', Validators.required);

  constructor(private leafService: LeafService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getLeafs();
    this.addLeafForm = this.formBuilder.group({
      name: this.name,
      size: this.size,
      color: this.color,
      count: this.count
    });
  }

  getLeafs() {
    this.leafService.getLeafs().subscribe(
      data => this.leafs = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addLeaf() {
    var body = "name=" + this.addLeafForm.value.name;
    this.leafService.addLeaf(this.addLeafForm.value).subscribe(
      res => {
        const newLeaf = res.json();
        this.leafs.push(newLeaf);
        this.addLeafForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(leaf) {
    this.isEditing = true;
    this.leaf = leaf;
  }

  cancelEditing() {
    this.isEditing = false;
    this.leaf = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the leafs to reset the editing
    this.getLeafs();
  }

  editLeaf(leaf) {
    this.leafService.editLeaf(leaf).subscribe(
      res => {
        this.isEditing = false;
        this.leaf = leaf;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteLeaf(leaf) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.leafService.deleteLeaf(leaf).subscribe(
        res => {
          const pos = this.leafs.map(elem => elem._id).indexOf(leaf._id);
          this.leafs.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}

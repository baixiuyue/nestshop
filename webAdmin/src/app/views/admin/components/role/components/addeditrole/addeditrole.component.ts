import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'role-addeditrole',
  templateUrl: './addeditrole.component.html',
  styleUrls: ['./addeditrole.component.scss']
})
export class AddeditroleComponent implements OnInit {
  @Input() selectTiem;
  @Output() private close = new EventEmitter();
  @Output() private upDate = new EventEmitter();
  isLoad: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}

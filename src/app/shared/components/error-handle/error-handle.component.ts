import { Component, OnInit } from '@angular/core';
import {ErrorHandleService} from '../../services/error-handle.service';

@Component({
  selector: 'app-error-handle',
  templateUrl: './error-handle.component.html',
  styleUrls: ['./error-handle.component.scss']
})
export class ErrorHandleComponent implements OnInit {

  constructor(public errorHandle : ErrorHandleService) { }

  ngOnInit(): void {
  
  }

}

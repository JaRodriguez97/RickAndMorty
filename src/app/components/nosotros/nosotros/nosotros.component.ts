import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css'],
})
export class NosotrosComponent implements OnInit {
  constructor(private spinnerService: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinnerService.hide();
  }
}

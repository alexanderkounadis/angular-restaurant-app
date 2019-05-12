import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private orderService: OrderService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
// tslint:disable-next-line: no-conditional-assignment
    if (form = null) {
      form.resetForm();
    }
    this.orderService.formData = {
      OrderId: null,
      OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      CustomerId: 0,
      PaymentMethod: '',
      GrandTotal: 0
    };
    this.orderService.orderItems = [];
  }

  AddOrEditOrderItem(orderItemIndex: number, OrderID: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {orderItemIndex, OrderID}
    this.dialog.open(OrderItemsComponent, dialogConfig);
  }

  onDeleteOrderItem(orderItemId: number, i: number) {
    this.orderService.orderItems.splice(i, 1);
  }
}

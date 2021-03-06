import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalBlockerComponent } from './global-blocker/global-blocker.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import {SingleSelectComponent} from "./select/single-select.component";
import {MultiSelectComponent} from "./select/multi-select.component";
import {SquareSpinnerComponent} from "./spinner/square-spinner.component";
import {CircleSpinnerComponent} from "./spinner/circle-spinner.component";
import {DynamicFormGroupComponent} from "./dynamic-form-group/dynamic-form-group.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormGroupParsePipe} from "./form.group.parse.pipe";
import {WrapperDirective} from "./wrapper.directive";
import {ChronicleNamePipe} from "./chronicle.name.pipe";
import {DamageComponent} from "./damage/damage.component";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    GlobalBlockerComponent,
    SingleSelectComponent,
    MultiSelectComponent,
    CircleSpinnerComponent,
    SquareSpinnerComponent,
    DynamicFormGroupComponent,
    DamageComponent,
    FormGroupParsePipe,
    ChronicleNamePipe,
    WrapperDirective
  ],
  exports: [
    GlobalBlockerComponent,
    SingleSelectComponent,
    MultiSelectComponent,
    CircleSpinnerComponent,
    SquareSpinnerComponent,
    DynamicFormGroupComponent,
    DamageComponent,
    FormGroupParsePipe,
    ChronicleNamePipe,
    WrapperDirective
  ],
  providers: [
    WrapperDirective
  ]
})
export class WidgetsModule { }

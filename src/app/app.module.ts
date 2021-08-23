import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth-guard.services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostloginhomeComponent } from './postloginhome/postloginhome.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { MustMatchDirective } from './directives/must-match.directive';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { CartComponent } from './cart/cart.component';
import { UserService } from './services/users.service';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { AddressUpdateComponent } from './address-update/address-update.component';
import { PaymentUpdateComponent } from './payment-update/payment-update.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PostloginhomeComponent,
    ProductDetailComponent,
    RegisterComponent,
    MustMatchDirective,
    ForgotpassComponent,
    CartComponent,
    ProfileComponent,
    SettingsComponent,
    AddressUpdateComponent,
    PaymentUpdateComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

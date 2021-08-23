import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressUpdateComponent } from './address-update/address-update.component';
import { CartComponent } from './cart/cart.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { PaymentUpdateComponent } from './payment-update/payment-update.component';
import { PostloginhomeComponent } from './postloginhome/postloginhome.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth-guard.services';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch:'full' 
  },
  { 
    path:'home', 
    component: HomeComponent
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'postloginhome', 
    component: PostloginhomeComponent, 
    canActivate:[AuthGuard]
  },
  { 
    path: 'postloginhome/product-detail/:id', 
    component: ProductDetailComponent
  },
  { 
    path: 'register', 
    component: RegisterComponent
  },
  { 
    path: 'forgotpass', 
    component: ForgotpassComponent
  },
  { 
    path: 'postloginhome/cart', 
    component: CartComponent, 
    canActivate:[AuthGuard]
  },
  { 
    path: 'postloginhome/profile', 
    component: ProfileComponent, 
    canActivate:[AuthGuard]
  },
  { 
    path: 'postloginhome/settings', 
    component: SettingsComponent, 
    canActivate:[AuthGuard]
  },
  { 
    path: 'postloginhome/address-update/:id', 
    component: AddressUpdateComponent, 
    canActivate:[AuthGuard]
  },
  { 
    path: 'postloginhome/payment-update/:id', 
    component: PaymentUpdateComponent, 
    canActivate:[AuthGuard]
  },
  { 
    path: 'postloginhome/orders', 
    component: OrdersComponent, 
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

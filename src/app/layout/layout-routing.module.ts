import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", redirectTo: "dashboard" },
      {
        path: "dashboard",
        loadChildren: "./dashboard/dashboard.module#DashboardModule"
      },
      { path: "smartbin", loadChildren: "./smartbin/smartbin.module#SmartbinModule" },
      { path: "user", loadChildren: "./user/user.module#UserModule" },
      { path: "admin", loadChildren: "./admin/admin.module#AdminModule" },
      { path: "rewards", loadChildren: "./rewards/rewards.module#RewardsModule" },
      { path: "buying", loadChildren: "./buying/buying.module#BuyingModule" },
      { path: "pay", loadChildren: "./pay/pay.module#PayModule" },
      { path: "sellgarbage", loadChildren: "./sell-garbage/sell-garbage.module#SellGarbageModule" },
      { path: "system", loadChildren: "./system/system.module#SystemModule" },
      { path: "rp-alert", loadChildren: "./rp-alert/rp-alert.module#RpAlertModule" },
      { path: "rp-exchange", loadChildren: "./rp-exchange/rp-exchange.module#RpExchangeModule" },
      { path: "rp-pay", loadChildren: "./rp-pay/rp-pay.module#RpPayModule" },
      { path: "rp-cumulative", loadChildren: "./rp-cumulative/rp-cumulative.module#RpCumulativeModule" },
      { path: "rp-buy", loadChildren: "./rp-buy/rp-buy.module#RpBuyModule" },
      { path: "rp-sell", loadChildren: "./rp-sell/rp-sell.module#RpSellModule" },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }

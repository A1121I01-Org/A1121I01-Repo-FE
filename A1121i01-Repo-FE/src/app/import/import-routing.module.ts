import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ImportManagerComponent} from './import-manager/import-manager.component';


const routes: Routes = [
  {path: '', component: ImportManagerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportRoutingModule {
}

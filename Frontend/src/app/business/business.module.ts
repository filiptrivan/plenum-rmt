import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
  ],
})
export class BusinessModule {
  constructor(@Optional() @SkipSelf() Business: BusinessModule) {
    if (Business) {
      throw new Error('Business Module can only be imported to AppModule.');
    }
  }
}

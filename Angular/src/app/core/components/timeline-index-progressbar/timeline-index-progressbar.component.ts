import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PrimengModule } from 'src/app/core/modules/primeng.module';
import { SoftPanelsModule } from "../soft-panels/soft-panels.module";
import { Tier } from 'src/app/business/entities/business-entities.generated';

@Component({
    selector: 'timeline-index-progressbar',
    templateUrl: './timeline-index-progressbar.component.html',
    standalone: true,
    imports: [
    CommonModule,
    PrimengModule,
    SoftPanelsModule
]
})
export class TimelineIndexProgressbarComponent {
    // @Input() last: boolean;
    // @Input() index: number;
    // @Input() header: string;
    // @Input() description: string;
    
    @Input() tierList: Tier[];
    @Input() currentTier: Tier;
    @Input() currentUserPoints: number;
    @Input() connectorMethod: (connector: Element, index: number) => void;
    resizeTimeout;

    constructor(
        protected formBuilder: FormBuilder,
        ) {

        }

    ngOnInit(){
        this.changeConnector();
    }

    isCurrentTier(tier: Tier){
        if (tier.id == this.currentTier?.id) { // currentTier could be null, for our example partner user doesn't always have current tier
          return true;
        }
    
        return false;
    }

    isPassed(tier: Tier){
        if (this.currentUserPoints >= tier.validTo) {
            return true;
        }

        return false;
    }

    changeConnector() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
          const connectors = document.querySelectorAll('.p-timeline-event-connector');
    
          if (connectors.length) {
            for (let i = connectors.length - 1; i >= 0; i--) {
              if (this.connectorMethod != null){
                  this.connectorMethod(connectors[i], i);
              }
            }
          }
        }, 100);
    }

}
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/business/services/api/api.service';
import { AuthService } from 'src/app/business/services/auth/auth.service';
import { MenuItem } from 'primeng/api';
import { TranslocoService } from '@jsverse/transloco';
import { UserExtendedVotingThemeItem, VoteType, VotingTheme, VotingThemeItem } from 'src/app/business/entities/business-entities.generated';
import { Menu } from 'primeng/menu';
import { SpiderMessageService } from '@playerty/spider';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  templateUrl: './voting-theme.component.html',
})
export class VotingThemeComponent implements OnInit {
  votingThemeId: number;
  votingThemeItems: VotingThemeItem[];
  voteTypes: VoteType[];

  crudMenu: MenuItem[] = [];
  @ViewChild('menu') menu: Menu;
  lastMenuToggledVotingTheme: VotingTheme;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private translocoService: TranslocoService,
    private messageService: SpiderMessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.apiService.getVoteTypeList().subscribe((res) => {
      this.voteTypes = res;
    });

    this.route.params.subscribe(async (params) => {
      this.votingThemeId = params['id'];
      this.getVotingThemeItems();
    });
  }
  
  getVotingThemeItems(){
    this.apiService.getVotingThemeItemListForDisplay(this.votingThemeId).subscribe((res) => {
      this.votingThemeItems = res;
    });
  }

  menuToggle($event: MouseEvent, votingThemeItem: VotingThemeItem) {
    this.menu.toggle($event);
    this.lastMenuToggledVotingTheme = votingThemeItem;
  }

  getVotingNumber(votingThemeItem: VotingThemeItem, voteType: VoteType): string {
    return votingThemeItem.usersVotedDTOList.filter(x => x.voteTypeId === voteType.id).length.toString();
  }

  async vote(votingThemeItem: VotingThemeItem, voteType: VoteType) {
    this.apiService.vote(votingThemeItem.id, voteType.id).subscribe();

    const currentUser = await firstValueFrom(this.authService.user$);

    const hasAlreadyVoted = votingThemeItem.usersVotedDTOList.some(x => x.userId === currentUser.id && x.voteTypeId === voteType.id);
    if (hasAlreadyVoted) {
      votingThemeItem.usersVotedDTOList = votingThemeItem.usersVotedDTOList.filter(x => x.userId !== currentUser.id || x.voteTypeId !== voteType.id);
    }
    else {
      votingThemeItem.usersVotedDTOList.push(new UserExtendedVotingThemeItem({
        userDisplayName: currentUser.email,
        userId: currentUser.id,
        voteTypeId: voteType.id,
      }));
    }
  }

}

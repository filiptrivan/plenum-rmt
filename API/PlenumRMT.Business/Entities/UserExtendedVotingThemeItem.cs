using Spider.Shared.Attributes.EF;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlenumRMT.Business.Entities
{
    public class UserExtendedVotingThemeItem
    {
        [M2MMaintanceEntity(nameof(User.VotedThemeItems))]
        public virtual UserExtended User { get; set; }

        [M2MEntity(nameof(VotingThemeItem.UsersVoted))]
        public virtual VotingThemeItem VotingThemeItem { get; set; }

        [ManyToOneRequired]
        [WithMany(nameof(VoteType.Votes))]
        [Key]
        public virtual VoteType VoteType { get; set; }
    }
}

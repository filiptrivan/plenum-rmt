using Spiderly.Shared.Attributes.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlenumRMT.Business.Entities
{
    [M2M]
    public class UserVotingThemeItem
    {
        [M2MWithMany(nameof(User.VotedThemeItems))]
        public virtual User User { get; set; }

        [M2MWithMany(nameof(VotingThemeItem.UsersVoted))]
        public virtual VotingThemeItem VotingThemeItem { get; set; }

        [Required]
        [CascadeDelete]
        [WithMany(nameof(VoteType.Votes))]
        [Key]
        public virtual VoteType VoteType { get; set; }
    }
}

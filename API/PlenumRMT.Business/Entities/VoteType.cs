using Spider.Shared.Attributes.EF;
using Spider.Shared.Attributes.EF.Translation;
using Spider.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlenumRMT.Business.Entities
{
    [DoNotAuthorize]
    [TranslateSingularSrLatnRS("Tip glasa")]
    [TranslatePluralSrLatnRS("Tipovi glasova")]
    public class VoteType : BusinessObject<int>
    {
        [DisplayName]
        [StringLength(100, MinimumLength = 1)]
        [Required]
        public string Name { get; set; }

        [StringLength(100, MinimumLength = 1)]
        [Required]
        public string Icon { get; set; }

        public virtual List<UserExtendedVotingThemeItem> Votes { get; } = new();
    }
}

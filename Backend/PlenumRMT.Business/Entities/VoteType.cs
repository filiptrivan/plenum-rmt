using Spiderly.Shared.Attributes.Entity;
using Spiderly.Shared.Attributes.Entity.Translation;
using Spiderly.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlenumRMT.Business.Entities
{
    [DoNotAuthorize]
    [TranslateSrLatnRS("Tip glasa")]
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

        public virtual List<UserVotingThemeItem> Votes { get; } = new();
    }
}

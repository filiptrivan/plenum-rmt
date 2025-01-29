using Spider.Shared.Attributes.EF;
using Spider.Shared.Attributes.EF.UI;
using Spider.Shared.BaseEntities;
using Spider.Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace PlenumRMT.Business.Entities
{
    [UIDoNotGenerate]
    public class VotingThemeItem : BusinessObject<long>
    {
        [UIControlWidth("col-12")]
        [DisplayName]
        [StringLength(100, MinimumLength = 1)]
        [Required]
        public string Name { get; set; }

        [UIControlType(nameof(UIControlTypeCodes.TextArea))]
        [StringLength(1000, MinimumLength = 1)]
        public string Description { get; set; }

        [UIDoNotGenerate]
        [Required]
        public int OrderNumber { get; set; }

        [ManyToOneRequired]
        [WithMany(nameof(VotingTheme.VotingThemeItems))]
        public virtual VotingTheme VotingTheme { get; set; }

        [IncludeInDTO]
        public virtual List<UserExtendedVotingThemeItem> UsersVoted { get; } = new(); // M2M
    }
}

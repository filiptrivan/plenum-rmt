using Spiderly.Shared.Attributes.Entity;
using Spiderly.Shared.Attributes.Entity.Translation;
using Spiderly.Shared.Attributes.Entity.UI;
using Spiderly.Shared.BaseEntities;
using Spiderly.Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace PlenumRMT.Business.Entities
{
    [DoNotAuthorize]
    [TranslateEn("Voting topic")]
    [TranslatePluralEn("Voting topics")]
    public class VotingTheme : BusinessObject<long>
    {
        [UIControlWidth("col-8")]
        [DisplayName]
        [StringLength(100, MinimumLength = 1)]
        [Required]
        public string Name { get; set; }

        [UIControlType(nameof(UIControlTypeCodes.TextArea))]
        [StringLength(1000, MinimumLength = 1)]
        public string Description { get; set; }

        [TranslateEn("Proposal")]
        [UIOrderedOneToMany]
        [IncludeInDTO]
        [Required]
        public virtual List<VotingThemeItem> VotingThemeItems { get; } = new();
    }
}

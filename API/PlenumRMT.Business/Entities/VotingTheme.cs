using Spider.Shared.Attributes.EF;
using Spider.Shared.Attributes.EF.Translation;
using Spider.Shared.Attributes.EF.UI;
using Spider.Shared.BaseEntities;
using Spider.Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace PlenumRMT.Business.Entities
{
    [TranslateSingularSrLatnRS("Tema glasanja")]
    [TranslatePluralSrLatnRS("Teme glasanja")]
    public class VotingTheme : BusinessObject<long>
    {
        [UIControlWidth("col-12")]
        [DisplayName]
        [StringLength(100, MinimumLength = 1)]
        [Required]
        public string Name { get; set; }

        [UIControlType(nameof(UIControlTypeCodes.TextArea))]
        [StringLength(1000, MinimumLength = 1)]
        public string Description { get; set; }

        [TranslateSingularSrLatnRS("Predlozi")]
        [UIOrderedOneToMany]
        [IncludeInDTO]
        [Required]
        public virtual List<VotingThemeItem> VotingThemeItems { get; } = new();
    }
}

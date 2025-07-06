using Spiderly.Shared.Attributes.Entity;
using Spiderly.Shared.Attributes.Entity.Translation;
using Spiderly.Shared.Attributes.Entity.UI;
using Spiderly.Shared.BaseEntities;
using Spiderly.Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace PlenumRMT.Business.Entities
{
    [DoNotAuthorize]
    [TranslateSrLatnRS("Tema glasanja")]
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

        [TranslateSrLatnRS("Predlozi")]
        [UIOrderedOneToMany]
        [IncludeInDTO]
        [Required]
        public virtual List<VotingThemeItem> VotingThemeItems { get; } = new();
    }
}

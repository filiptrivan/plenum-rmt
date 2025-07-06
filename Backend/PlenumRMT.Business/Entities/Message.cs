using Spiderly.Shared.Attributes.Entity;
using Spiderly.Shared.Attributes.Entity.Translation;
using Spiderly.Shared.Attributes.Entity.UI;
using Spiderly.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlenumRMT.Business.Entities
{
    [UIDoNotGenerate]
    [DoNotAuthorize]
    [TranslatePluralSrLatnRS("Poruke")]
    public class Message : BusinessObject<long>
    {
        [DisplayName]
        [StringLength(8000, MinimumLength = 1)]
        [Required]
        public string Text { get; set; }

        [Required]
        [CascadeDelete]
        [WithMany(nameof(User.SentMessages))]
        public virtual User Sender { get; set; }

        public virtual List<User> Recipients { get; } = new(); // M2M
    }
}

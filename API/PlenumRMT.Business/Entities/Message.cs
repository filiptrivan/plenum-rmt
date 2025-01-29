using Spider.Shared.Attributes.EF;
using Spider.Shared.Attributes.EF.UI;
using Spider.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlenumRMT.Business.Entities
{
    [UIDoNotGenerate]
    public class Message : BusinessObject<long>
    {
        [StringLength(8000, MinimumLength = 1)]
        [Required]
        public string Text { get; set; }

        [ManyToOneRequired]
        [WithMany(nameof(UserExtended.SentMessages))]
        public virtual UserExtended Sender { get; set; }

        public virtual List<UserExtended> Recipients { get; } = new(); // M2M
    }
}

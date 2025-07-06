using Spiderly.Shared.Attributes.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlenumRMT.Business.Entities
{
    [M2M]
    public class UserMessage
    {
        [M2MWithMany(nameof(Recipient.ReceivedMessages))]
        public virtual User Recipient { get; set; }

        [M2MWithMany(nameof(Message.Recipients))]
        public virtual Message Message { get; set; }
    }
}

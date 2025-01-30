using Spider.Shared.Attributes.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlenumRMT.Business.Entities
{
    public class UserExtendedMessage
    {
        [M2MMaintanceEntity(nameof(Recipient.ReceivedMessages))]
        public virtual UserExtended Recipient { get; set; }

        [M2MEntity(nameof(Message.Recipients))]
        public virtual Message Message { get; set; }
    }
}

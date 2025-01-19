using Soft.Generator.Shared.Attributes.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlenumRMT.Business.Entities
{
    public class UserExtendedMessage
    {
        [M2MMaintanceEntity(nameof(User.ReceivedMessages))]
        public virtual UserExtended User { get; set; }

        [M2MExtendEntity(nameof(Message.Recipients))]
        public virtual Message Message { get; set; }
    }
}

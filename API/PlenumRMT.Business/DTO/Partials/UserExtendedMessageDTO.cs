using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlenumRMT.Business.DTO
{
    public partial class UserExtendedMessageDTO
    {
        public long SenderId { get; set; }
        public string SenderDisplayName { get; set; }
    }
}

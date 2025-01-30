using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlenumRMT.Business.DTO
{
    public class SendMessageSaveBodyDTO
    {
        public long RecipientId { get; set; }
        public string MessageText { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlenumRMT.Business.DTO
{
    public partial class UserExtendedSaveBodyDTO
    {
        /// <summary>
        /// Needs to have it here, because in generated business service, we don't have reference to the security service
        /// </summary>
        public List<int> SelectedRolesIds { get; set; }
    }
}

using Microsoft.EntityFrameworkCore;
using Spider.Security.Entities;
using Spider.Security.Interface;
using Spider.Shared.Attributes;
using Spider.Shared.Attributes.EF;
using Spider.Shared.Attributes.EF.UI;
using Spider.Shared.BaseEntities;
using Spider.Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace PlenumRMT.Business.Entities
{
    [Index(nameof(Email), IsUnique = true)]
    public class UserExtended : BusinessObject<long>, IUser
    {
        [DisplayName]
        [CustomValidator("EmailAddress()")]
        [StringLength(70, MinimumLength = 5)]
        [Required]
        public string Email { get; set; }

        public bool? HasLoggedInWithExternalProvider { get; set; }

        public bool? IsDisabled { get; set; }

        public virtual List<Message> SentMessages { get; } = new();

        public virtual List<Role> Roles { get; } = new(); // M2M

        public virtual List<Notification> Notifications { get; } = new(); // M2M

        public virtual List<Message> ReceivedMessages { get; } = new(); // M2M

        public virtual List<UserExtendedVotingThemeItem> VotedThemeItems { get; } = new(); // M2M
    }
}

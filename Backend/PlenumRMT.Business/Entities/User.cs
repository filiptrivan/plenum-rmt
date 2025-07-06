using Microsoft.EntityFrameworkCore;
using Spiderly.Security.Entities;
using Spiderly.Security.Interfaces;
using Spiderly.Shared.Attributes;
using Spiderly.Shared.Attributes.Entity;
using Spiderly.Shared.Attributes.Entity.UI;
using Spiderly.Shared.BaseEntities;
using Spiderly.Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace PlenumRMT.Business.Entities
{
    [Index(nameof(Email), IsUnique = true)]
    public class User : BusinessObject<long>, IUser
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

        public virtual List<UserVotingThemeItem> VotedThemeItems { get; } = new(); // M2M
    }
}

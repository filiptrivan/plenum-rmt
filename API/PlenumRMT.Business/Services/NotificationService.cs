using PlenumRMT.Business.Entities;
using Spider.Security.Interface;
using Spider.Shared.Extensions;
using Spider.Shared.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlenumRMT.Business.Services
{
    public class NotificationService
    {
        private readonly IApplicationDbContext _context;

        public NotificationService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SendNotification(UserExtended user, string notificationTitle, string notificationDescription)
        {
            await _context.WithTransactionAsync(async () =>
            {
                Notification notification = new Notification
                {
                    Title = notificationTitle,
                    Description = notificationDescription,
                };

                user.Notifications.Add(notification);

                await _context.SaveChangesAsync();
            });
        }

    }
}

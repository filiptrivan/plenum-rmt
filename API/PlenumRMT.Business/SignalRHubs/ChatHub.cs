using Microsoft.AspNetCore.SignalR;
using PlenumRMT.Business.DTO;
using PlenumRMT.Business.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlenumRMT.Business.SignalRHubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(object saveBodyDTO)
        {
            //await Clients.Group(recipient.Id.ToString()).SendAsync("ReceiveMessage", recipient, message);
            await Clients.All.SendAsync("ReceiveMessage", saveBodyDTO);
        }
    }
}

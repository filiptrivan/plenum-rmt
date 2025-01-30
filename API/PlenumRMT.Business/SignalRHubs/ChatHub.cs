using Azure.Core;
using Microsoft.AspNetCore.SignalR;
using PlenumRMT.Business.DTO;
using PlenumRMT.Business.Entities;
using Spider.Security.Services;
using Spider.Shared.Attributes;
using Spider.Shared.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PlenumRMT.Business.SignalRHubs
{
    public class ChatHub : Hub
    {
        private readonly AuthenticationService _authenticationService;

        public ChatHub(AuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        public override async Task OnConnectedAsync()
        {
            if (!Helper.IsJwtTokenValid(await _authenticationService.GetAccessTokenAsync()))
            {
                // TODO FT: Log
                return;
            }

            string connectedUserId = _authenticationService.GetCurrentUserId().ToString();
            await Groups.AddToGroupAsync(Context.ConnectionId, connectedUserId);
        }

        public async Task SendMessage(SendMessageSaveBodyDTO saveBodyDTO)
        {
            if (!Helper.IsJwtTokenValid(await _authenticationService.GetAccessTokenAsync()))
            {
                // TODO FT: Log
                return;
            }

            await Clients.Groups([saveBodyDTO.RecipientId.ToString(), saveBodyDTO.SenderId.ToString()]).SendAsync("ReceiveMessage", saveBodyDTO);
        }
    }
}

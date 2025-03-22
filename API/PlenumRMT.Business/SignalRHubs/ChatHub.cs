using Microsoft.AspNetCore.SignalR;
using PlenumRMT.Business.DTO;
using Spider.Security.Services;
using Spider.Shared.Helpers;

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
                // TODO: Log
                return;
            }

            string connectedUserId = _authenticationService.GetCurrentUserId().ToString();
            await Groups.AddToGroupAsync(Context.ConnectionId, connectedUserId);
        }

        public async Task SendMessage(SendMessageSaveBodyDTO saveBodyDTO)
        {
            if (!Helper.IsJwtTokenValid(await _authenticationService.GetAccessTokenAsync()))
            {
                // TODO: Log
                return;
            }

            await Clients.Groups([saveBodyDTO.RecipientId.ToString(), saveBodyDTO.SenderId.ToString()]).SendAsync("ReceiveMessage", saveBodyDTO);
        }
    }
}

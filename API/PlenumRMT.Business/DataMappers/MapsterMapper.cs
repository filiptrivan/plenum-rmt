using Mapster;
using PlenumRMT.Business.DTO;
using PlenumRMT.Business.Entities;
using Spider.Shared.Attributes;

namespace PlenumRMT.Business.DataMappers
{
    [CustomMapper]
    public static partial class Mapper
    {
        public static TypeAdapterConfig UserExtendedMessageToDTOConfig()
        {
            TypeAdapterConfig config = new TypeAdapterConfig();

            config
                .NewConfig<UserExtendedMessage, UserExtendedMessageDTO>()
                .Map(dest => dest.RecipientId, src => src.Recipient.Id)
                .Map(dest => dest.RecipientDisplayName, src => src.Recipient.Email)
                .Map(dest => dest.MessageId, src => src.Message.Id)
                .Map(dest => dest.MessageDisplayName, src => src.Message.Text)
                .Map(dest => dest.SenderId, src => src.Message.Sender.Id)
                .Map(dest => dest.SenderDisplayName, src => src.Message.Sender.Email)
                ;

            return config;
        }
    }
}
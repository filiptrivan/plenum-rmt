using Mapster;
using PlenumRMT.Business.DTO;
using PlenumRMT.Business.Entities;
using Spider.Shared.Attributes;

namespace PlenumRMT.Business.DataMappers
{
    [CustomMapper]
    public static partial class Mapper
    {
        public static TypeAdapterConfig UserExtendedVotingThemeItemToDTOConfig()
        {
            TypeAdapterConfig config = new TypeAdapterConfig();

            config
                .NewConfig<UserExtendedVotingThemeItem, UserExtendedVotingThemeItemDTO>()
                .Map(dest => dest.UserId, src => src.User.Id)
                .Map(dest => dest.UserDisplayName, src => src.User.Email)
                .Map(dest => dest.VotingThemeItemId, src => src.VotingThemeItem.Id)
                .Map(dest => dest.VotingThemeItemDisplayName, src => src.VotingThemeItem.Name)
                .Map(dest => dest.VoteTypeId, src => src.VoteType.Id)
                .Map(dest => dest.VoteTypeDisplayName, src => src.VoteType.Name)
                .Map(dest => dest.VoteTypeIcon, src => src.VoteType.Icon)
                ;

            return config;
        }
    }
}
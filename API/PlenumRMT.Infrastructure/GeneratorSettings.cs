using Spider.Shared.Attributes;

namespace PlenumRMT.Infrastructure.GeneratorSettings
{
    public class GeneratorSettings
    {
        [Output("true")]
        public bool DbContextGenerator { get; set; }
    }
}

using Microsoft.EntityFrameworkCore;
using PlenumRMT.Business.Entities;
using Soft.Generator.Infrastructure;

namespace PlenumRMT.Infrastructure
{
    public partial class PlenumRMTApplicationDbContext : ApplicationDbContext<UserExtended> // https://stackoverflow.com/questions/41829229/how-do-i-implement-dbcontext-inheritance-for-multiple-databases-in-ef7-net-co
    {
        public PlenumRMTApplicationDbContext(DbContextOptions<PlenumRMTApplicationDbContext> options)
        : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await base.SaveChangesAsync(cancellationToken);
        }

    }
}

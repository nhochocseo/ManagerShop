using CVD.Entities;
using Sieve.Attributes;

namespace ManagerShop.Entities
{
    public class Category : BaseEntity
    {
        [Sieve(CanFilter = true, CanSort = true)]
        public string Name { get; set; }
        [Sieve(CanFilter = true, CanSort = true)]
        public decimal ParentId { get; set; }
    }
}

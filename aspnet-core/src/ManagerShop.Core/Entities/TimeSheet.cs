using Abp.Domain.Entities;
using Sieve.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using static CVD.Entities.Enum.StatusEnum;

namespace CVD.Entities
{
    public class ManagerShop: BaseEntity
    {
        [Sieve(CanFilter = true, CanSort = true)]
        public DateTime StartDate { get; set; }
        [Sieve(CanFilter = true, CanSort = true)]
        public DateTime EndDate { get; set; }
        
        [Sieve(CanFilter = true, CanSort = true)]
        public ManagerShopStatus Status { get; set; }

        [Sieve(CanFilter = true, CanSort = true)]
        public DateTime ApprovedDate { get; set; }

        [Sieve(CanFilter = true, CanSort = true)]
        public long MemberId { get; set; }
        public Member Member { get; set; }
        public IList<ManagerShopItem> ManagerShopItems { get; set; }
    }
}

using Abp.Domain.Entities;
using Sieve.Attributes;
using System;
using System.Collections.Generic;
using System.Text;
using static CVD.Entities.Enum.StatusEnum;

namespace CVD.Entities
{
    public class Task: BaseEntity
    {
        [Sieve(CanFilter = true, CanSort = true)]
        public string Name { get; set; }
        [Sieve(CanFilter = true, CanSort = true)]
        public bool Billable { get; set; }
        [Sieve(CanFilter = true, CanSort = true)]
        public EnumTaskType Type { get; set; }
    }
}

using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CVD.Entities
{
    public class ProjectCustomer : BaseEntity
    {
        public Project Project { get; set; }
        public long ProjectId { get; set; }

        public Customer Customer { get; set; }
        public long CustomerId { get; set; }
    }
}

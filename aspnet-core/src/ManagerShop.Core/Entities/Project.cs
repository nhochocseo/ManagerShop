using Abp.Domain.Entities;
using CVD.Entities.Enum;
using System;
using System.Collections.Generic;
using System.Text;
using static CVD.Entities.Enum.StatusEnum;
using Sieve.Attributes;
using AutoMapper;
using Abp.AutoMapper;

namespace CVD.Entities
{
    public class Project : BaseEntity
    {
        [Sieve(CanFilter = true, CanSort = true)]
        public string Name { get; set; }
        [Sieve(CanFilter = true, CanSort = true)]
        public DateTime TimeStart { get; set; }
        [Sieve(CanFilter = true, CanSort = true)]
        public DateTime TimeEnd { get; set; }
        [Sieve(CanFilter = true, CanSort = true)]
        public EnumProjectStatus Status { get; set; }
        public string Code { get; set; }
        public EnumProjectType ProjectType { get; set; }
        public string Note { get; set; }

        public IList<ProjectMember> ProjectMembers { get; set; }
        public IList<ProjectCustomer> ProjectCustomers { get; set; }
        public IList<ProjectTask> ProjectTasks { get; set; }
    }
}

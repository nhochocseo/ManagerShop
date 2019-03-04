using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace CVD.Entities
{
    public class ProjectMember: BaseEntity
    {
        public Member Member { get; set; }
        public long MemberId { get; set; }

        public Project Project { get; set; }
        public long ProjectId { get; set; }

        public ProjectRole ProjectRole { get; set; }
        public long? ProjectRoleId { get; set; }
        public bool IsProjectAdmin { get; set; }
    }
}

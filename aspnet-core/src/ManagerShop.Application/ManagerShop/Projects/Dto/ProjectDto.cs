using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using CVD.CommonDto;
using CVD.Entities;

namespace CVD.ManagerShops.Projects.Dto
{
    //[AutoMapTo(typeof(Project))]
    public class ProjectDto : BaseProjectDto
    {
        public IEnumerable<ProjectMemberDto> ProjectMembers { get; set; }
        public IEnumerable<ProjectCustomerDto> ProjectCustomers { get; set; }
        public IEnumerable<ProjectTaskDto> ProjectTasks { get; set; }
    }
}

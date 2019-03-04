﻿using Abp.AutoMapper;
using Abp.Modules;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using CVD.CommonDto;
using CVD.Entities;

namespace CVD.ManagerShops.Projects.Dto
{
    [AutoMapTo(MemberList.Source, typeof(ProjectMember))]
    public class ProjectMemberDto : BaseProjectMemberDto
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }

        public BaseProjectRoleDto ProjectRole { get; set; }
    }
}

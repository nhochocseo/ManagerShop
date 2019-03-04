using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using CVD.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace CVD.CommonDto
{
    [AutoMapTo(typeof(ProjectRole))]
    public class BaseProjectRoleDto : BaseEntityDto
    {
        public string Name { get; set; }
    }
}

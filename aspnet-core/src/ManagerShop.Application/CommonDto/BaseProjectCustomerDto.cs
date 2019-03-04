using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using CVD.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace CVD.CommonDto
{
    [AutoMapTo(typeof(ProjectCustomer))]
    public class BaseProjectCustomerDto : BaseEntityDto
    {
        public long ProjectId { get; set; }
        public long CustomerId { get; set; }
    }
}

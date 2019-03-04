using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using CVD.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using static CVD.Entities.Enum.StatusEnum;

namespace CVD.CommonDto
{
    [AutoMapTo(typeof(ManagerShopItem))]
    public class BaseManagerShopDto : BaseEntityDto
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public ManagerShopStatus? Status { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public long? MemberId { get; set; }
    }
}

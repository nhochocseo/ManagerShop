using Abp.AutoMapper;
using CVD.CommonDto;
using ManagerShop.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerShop.CommonDto
{
    [AutoMapTo(typeof(Category))]
    public class BaseCategoryDto : BaseEntityDto
    {
        public string Name { get; set; }
        public decimal ParentId { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using CVD.Entities;
using CVD.ManagerShops.ManagerShops.Dto;

namespace CVD.ManagerShops.ManagerShops
{
    public static class ManagerShopMapper
    {
        public static void CreateMapping(IMapperConfigurationExpression config)
        {
            config.CreateMap<ManagerShop, ManagerShopDto>()
                .ReverseMap()
                .ForMember(d => d.ManagerShopItems, options => options.Ignore());
        }
    }
}

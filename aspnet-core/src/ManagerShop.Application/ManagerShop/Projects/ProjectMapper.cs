using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using CVD.Entities;
using CVD.ManagerShops.Projects.Dto;

namespace CVD.ManagerShops.Projects
{
    public static class ProjectMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression config)
        {
            config.CreateMap<ProjectTask, ProjectTaskDto>()
                      .ForMember(dto => dto.Name, options => options.MapFrom(ent => ent.Task.Name))
                      .ForMember(dto => dto.Type, options => options.MapFrom(ent => ent.Task.Type))
                      .ReverseMap()
                      .ForMember(d => d.Task, options => options.Ignore());

            config.CreateMap<ProjectMember, ProjectMemberDto>()
                      .ForMember(dto => dto.Name, options => options.MapFrom(e => e.Member.Name))
                      .ForMember(dto => dto.Address, options => options.MapFrom(e => e.Member.Address))
                      .ForMember(dto => dto.Phone, options => options.MapFrom(e => e.Member.Phone))
                      .ForMember(dto => dto.Email, options => options.MapFrom(e => e.Member.Email))
                      .ReverseMap()
                      .ForMember(d => d.Member, options => options.Ignore())
                      .ForMember(d => d.ProjectRole, options => options.Ignore());

            config.CreateMap<ProjectCustomer, ProjectCustomerDto>()
                      .ForMember(dto => dto.Name, options => options.MapFrom(e => e.Customer.Name))
                      .ForMember(dto => dto.Address, options => options.MapFrom(e => e.Customer.Address))
                      .ForMember(dto => dto.Phone, options => options.MapFrom(e => e.Customer.Phone))
                      .ForMember(dto => dto.Email, options => options.MapFrom(e => e.Customer.Email))
                      .ReverseMap()
                      .ForMember(d => d.Customer, options => options.Ignore());

            config.CreateMap<Project, ProjectDto>()
                      .ReverseMap()
                      .ForMember(dto => dto.ProjectCustomers, options => options.Ignore())
                      .ForMember(dto => dto.ProjectMembers, options => options.Ignore())
                      .ForMember(dto => dto.ProjectTasks, options => options.Ignore());
        }
    }
}

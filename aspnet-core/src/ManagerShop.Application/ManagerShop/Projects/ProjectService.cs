using Audit.MessageReponse;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CVD.CommonDto;
using CVD.Entities;
using CVD.ManagerShops.Projects.Dto;
using static CVD.Entities.Enum.StatusEnum;

namespace CVD.ManagerShops.Projects
{
    public class ProjectService : AppServiceFilterBase<Project, ProjectDto>
    {
        public override async Task<ProjectDto> Save(ProjectDto req)
        {
            var result = await base.SaveReturnEntity(req);
            // save project member
            await WorkScope.Sync<BaseProjectMemberDto, ProjectMember>(req.ProjectMembers, x => x.ProjectId == result.Id, x =>
            {
                x.ProjectId = result.Id;
                return x;
            });
            // save project customer
            await WorkScope.Sync<BaseProjectCustomerDto, ProjectCustomer>(req.ProjectCustomers, x => x.ProjectId == result.Id, x =>
            {
                x.ProjectId = result.Id;
                return x;
            });
            // save project task
            await WorkScope.Sync<BaseProjectTaskDto, Entities.ProjectTask>(req.ProjectTasks, x => x.ProjectId == result.Id, x =>
            {
                x.ProjectId = result.Id;
                return x;
            });
            var rs = ObjectMapper.Map<ProjectDto>(result);
            return rs;
        }

        public async Task<Response> ChangeStatusProject(ChangeStatusProjectRequestDto param)
        {
            var project = await WorkScope.Repository<Project>().FirstOrDefaultAsync(s => s.Id == param.id);
            project.Status = param.status;
            
            return new Response
            {
                Code = ResponseCode.Success
            };
        }

        public async Task<IEnumerable<ProjectDetailTaskDto>> GetProjectDetailTask(DateTime? fromDate, DateTime? toDate, long projectId)
        {
            var taskHour =
                from tsItem in WorkScope.All<ManagerShopItem>()
                .Where(s => s.ProjectId == projectId)

                join ManagerShop in WorkScope.All<ManagerShop>()
                .Where(s => fromDate == null || s.ApprovedDate >= fromDate)
                .Where(s => toDate == null || s.ApprovedDate <= toDate)
                on tsItem.ManagerShopId equals ManagerShop.Id

                group tsItem by tsItem.TaskId into taskGroup

                join task in WorkScope.All<Entities.Task>()
                on taskGroup.Key equals task.Id
                select new ProjectDetailTaskDto
                {
                    Id = taskGroup.Key,
                    Name = task.Name,
                    BillableStatus = task.Billable,
                    Hours = taskGroup.Sum(s => s.WorkingTime)
                };
            return await taskHour.ToListAsync();
        }

        public async Task<IEnumerable<ProjectDetailTeamDto>> GetProjectDetailTeam(DateTime? fromDate, DateTime? toDate, long projectId)
        {
            var teamHours =
                from tsItem in WorkScope.All<ManagerShopItem>()
                .Where(s => s.ProjectId == projectId)

                join ManagerShop in WorkScope.All<ManagerShop>()
                .Where(s => fromDate == null || s.ApprovedDate >= fromDate)
                .Where(s => toDate == null || s.ApprovedDate <= toDate)
                on tsItem.ManagerShopId equals ManagerShop.Id

                group tsItem by tsItem.ManagerShop.MemberId into memberGroup

                join member in WorkScope.All<Member>()
                on memberGroup.Key equals member.Id
                select new ProjectDetailTeamDto
                {
                    Id = memberGroup.Key,
                    Name = member.Name,
                    Hours = memberGroup.Sum(s => s.WorkingTime)
                };
            return await teamHours.ToListAsync();
        }

    }
}

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
        

    }
}

using Abp.Authorization.Users;
using Abp.Domain.Entities;
using Sieve.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using CVD.Authorization.Users;

namespace CVD.Entities
{
    public class Member : BaseEntity
    {
        [Sieve(CanFilter = true, CanSort = true)]
        public string Name { get; set; }
        [Sieve(CanFilter = true, CanSort = true)]
        public string Address { get; set; }
        [Sieve(CanFilter = true, CanSort = true)]
        public string Phone { get; set; }
        [Sieve(CanFilter = true, CanSort = true)]
        public string Email { get; set; }

        public IList<ProjectMember> ProjectMembers { get; set; }

        public User User { get; set; }
        public long? UserId { get; set; }
    }
}

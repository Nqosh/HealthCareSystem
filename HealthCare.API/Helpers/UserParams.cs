using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingAPP.API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;

        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

        public int UserId { get; set; }
        public string Gender { get; set; }
        public string Name { get; set; }     
        public string Surname { get; set; }
        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 99;

        public string OrderBy { get; set; } = "created";

        public bool Likees { get; set; } = false;

        public bool Likers { get; set; } = false;
    }
}

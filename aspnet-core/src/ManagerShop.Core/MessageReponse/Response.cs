using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Audit.MessageReponse
{
    public class Response
    {
        public string ErrorDescription { get; set; }
        public ResponseCode Code { get; set; }
    }
}

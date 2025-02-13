using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos
{
    public class NextPredictedOrder
    {
        public int Custid { get; set; }
        public string CustomerName { get; set; } = null!;
        public DateTime LastOrderDate { get; set; }
        public DateTime NextPredictedOrderDate { get; set; }

    }
}

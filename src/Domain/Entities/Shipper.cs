using System;
using System.Collections.Generic;

namespace Domain.Entities;

public partial class Shipper
{
    public int Shipperid { get; set; }

    public string Companyname { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public virtual List<Order> Orders { get; set; } = new List<Order>();
}

using Application.Interface;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace SalesDatePredictionWebApi.Routes
{
    public static class ShipperRoute
    {

        public static RouteGroupBuilder GroupShipper(this RouteGroupBuilder group)
        {
            group.MapGet("/", async ( [FromServices] IShipper _shipper) =>
            {
                return TypedResults.Ok(await _shipper.GetAll());
            });
            group.WithTags("Shippers");
            group.WithOpenApi();
            return group;
        }
    }
}

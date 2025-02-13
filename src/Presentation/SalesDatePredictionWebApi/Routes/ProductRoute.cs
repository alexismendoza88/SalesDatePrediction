using Application.Interface;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace SalesDatePredictionWebApi.Routes
{
    public static class ProductRoute
    {

        public static RouteGroupBuilder GroupProduct(this RouteGroupBuilder group)
        {
            group.MapGet("/", async ( [FromServices] IProduct _product) =>
            {
                return TypedResults.Ok(await _product.GetAll());
            });
            group.WithTags("Products");
            group.WithOpenApi();
            return group;
        }
    }
}

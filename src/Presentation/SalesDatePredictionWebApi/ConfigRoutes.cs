using SalesDatePredictionWebApi.Routes;

namespace SalesDatePredictionWebApi
{
    public static class ConfigRoutes
    {

        public static void AddRoutes(this WebApplication app)
        {
            app.MapGroup("api/v1/orders").GroupOrder().RequireAuthorization();
            app.MapGroup("api/v1/products").GroupProduct().RequireAuthorization();
            app.MapGroup("api/v1/shhippers").GroupShipper().RequireAuthorization();
            app.MapGroup("api/v1/employees").GroupEmployee().RequireAuthorization();
        }

    }
}

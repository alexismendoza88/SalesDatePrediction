using Azure.Core;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Text;

namespace SalesDatePredictionWebApi.Handler
{
    public class BasicAuthenticationHandler :  AuthenticationHandler<AuthenticationSchemeOptions>  
    {  
    
        IConfiguration _config;
        #region Constructor  
        public BasicAuthenticationHandler(
            IConfiguration config,
            IOptionsMonitor<AuthenticationSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock)
            : base(options, logger, encoder, clock)
        {
            _config = config;
        }
        #endregion

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            string username = null;
            try
            {
                if (!Request.Method.Contains("options", StringComparison.InvariantCultureIgnoreCase))
                {
                    var authHeader = AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]!);
                    var credentials = Encoding.UTF8.GetString(Convert.FromBase64String(authHeader.Parameter)).Split(':');
                    username = credentials.FirstOrDefault();
                    var password = credentials.LastOrDefault();

                    var userb64local = _config.GetValue<string>("userpass");
                    var userb64localArr = Encoding.UTF8.GetString(Convert.FromBase64String(userb64local)).Split(':');
                    var usernamelocal = userb64localArr.FirstOrDefault();
                    var passwordlocal = userb64localArr.LastOrDefault();



                    if (userb64local != username && passwordlocal != password)
                        throw new ArgumentException("Invalid credentials");
                }
                else {
                    return AuthenticateResult.NoResult();
                }
            }
            catch (Exception ex)
            {
                return AuthenticateResult.Fail($"Authentication failed: {ex.Message}");
            }

            var claims = new[] {
                new Claim(ClaimTypes.Name, username)
            };
            var identity = new ClaimsIdentity(claims, Scheme.Name);
            var principal = new ClaimsPrincipal(identity);
            var ticket = new AuthenticationTicket(principal, Scheme.Name);

            return AuthenticateResult.Success(ticket);
        }
    }
}

using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SimpleCalculator.Startup))]
namespace SimpleCalculator
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

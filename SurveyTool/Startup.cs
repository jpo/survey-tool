using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SurveyTool.Startup))]
namespace SurveyTool
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

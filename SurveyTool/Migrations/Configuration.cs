namespace SurveyTool.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<SurveyTool.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "SurveyTool.Models.ApplicationDbContext";
        }

        protected override void Seed(SurveyTool.Models.ApplicationDbContext context)
        {
        }
    }
}

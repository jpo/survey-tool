using System.Web;
using System.Web.Optimization;

namespace SurveyTool
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            // ====================================================================================
            // STYLES
            // ====================================================================================

            bundles.Add(new StyleBundle("~/Content/bootstrap")
                            .Include("~/Content/bootstrap.css")
                            .Include("~/Content/bootstrap-datepicker.css"));

            bundles.Add(new StyleBundle("~/Content/cleditor")
                            .Include("~/Content/jquery.cleditor.css"));

            bundles.Add(new StyleBundle("~/Content/toastr")
                            .Include("~/Content/toastr.css"));

            bundles.Add(new StyleBundle("~/Content/site")
                            .Include("~/Content/site.css"));

            // ====================================================================================
            // SCRIPTS
            // ====================================================================================

            bundles.Add(new ScriptBundle("~/bundles/bootstrap")
                            .Include("~/Scripts/bootstrap.js")
                            .Include("~/Scripts/bootstrap-datepicker.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery")
                            .Include("~/Scripts/jquery-{version}.js")
                            .Include("~/Scripts/jquery-migrate-1.1.1.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval")
                            .Include("~/Scripts/jquery.unobtrusive*")
                            .Include("~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/cleditor")
                            .Include("~/Scripts/jquery.cleditor.js")
                            .Include("~/Scripts/knockout.cleditor.js"));

            bundles.Add(new ScriptBundle("~/bundles/knockout")
                            .Include("~/Scripts/knockout-{version}.js")
                            .Include("~/Scripts/knockout.mapping-latest.js")
                            .Include("~/Scripts/knockout.enter.js")
                            .Include("~/Scripts/knockout.validation.js"));

            bundles.Add(new ScriptBundle("~/bundles/toastr")
                            .Include("~/Scripts/toastr.js"));

            bundles.Add(new ScriptBundle("~/bundles/models")
                            .Include("~/Scripts/vm.department.js")
                            .Include("~/Scripts/vm.question.js")
                            .Include("~/Scripts/vm.responselist.js")
                            .Include("~/Scripts/vm.survey.js")
                            .Include("~/Scripts/vm.surveylist.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when 
            // you're ready for production, use the build tool at http://modernizr.com to pick 
            // only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr")
                            .Include("~/Scripts/modernizr-*"));
        }
    }
}

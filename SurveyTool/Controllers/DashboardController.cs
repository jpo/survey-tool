using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SurveyTool.Models;

namespace SurveyTool.Controllers
{
    [Authorize]
    public class DashboardController : Controller
    {
        private readonly ApplicationDbContext _db;

        public DashboardController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public ActionResult Index()
        {
            ViewBag.Surveys = GetSurveys();
            ViewBag.Responses = GetResponses();
            return View();
        }

        private IEnumerable<Survey> GetSurveys()
        {
            return _db.Surveys
                      .Select(s => new
                          {
                              Survey = s,
                              Questions = s.Questions.Where(q => q.IsActive),
                              Responses = s.Responses
                                           .Where(r => r.CreatedBy == User.Identity.Name)
                                           .OrderByDescending(r => r.CreatedOn)
                                           .Take(1)
                          })
                      .AsEnumerable()
                      .Select(x =>
                          {
                              x.Survey.Questions = x.Questions.ToList();
                              x.Survey.Responses = x.Responses.ToList();
                              return x.Survey;
                          })
                      .OrderByDescending(s => s.IsActive)
                      .ThenBy(s => s.Name);
        }

        private IEnumerable<Response> GetResponses()
        {
            return _db.Responses
                     .Include("Survey")
                     .Include("Answers")
                     .Where(x => x.CreatedBy == User.Identity.Name)
                     .OrderByDescending(x => x.CreatedOn)
                     .ThenByDescending(x => x.Id)
                     .ToList();
        }
    }
}
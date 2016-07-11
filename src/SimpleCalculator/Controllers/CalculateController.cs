using System.Web.Mvc;

namespace SimpleCalculator.Controllers
{
    public class CalculateController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
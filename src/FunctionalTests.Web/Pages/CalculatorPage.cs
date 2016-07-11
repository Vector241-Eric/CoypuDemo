using Coypu;

namespace FunctionalTests.Web.Pages
{
    public class CalculatorPage : PageBase
    {
        public CalculatorPage(BrowserSession browser) : base(browser)
        {
        }

        protected override string RelativeUrl => "~/Calculate";

        protected override bool HasIdentifyingElements()
        {
            return Browser.FindId("calculator-wrapper").Exists();
        }
    }
}
using Coypu;

namespace FunctionalTests.Web.Pages
{
    public class CalculatorPage : PageBase<CalculatorPage>
    {
        public CalculatorPage(BrowserSession browser) : base(browser)
        {
        }

        protected override string RelativeUrl => "~/Calculate";

        protected override bool HasIdentifyingElements()
        {
            return Browser.FindId("calculator-wrapper").Exists();
        }

        public string GetDisplayValue()
        {
            return Browser.FindId("display-value").Text;
        }

        public void Enter(string value)
        {
            foreach (var character in value)
            {
                Browser.ClickButton(character.ToString());
            }
        }
    }
}
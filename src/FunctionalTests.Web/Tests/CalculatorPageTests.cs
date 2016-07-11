using FunctionalTests.Web.Bases;
using FunctionalTests.Web.Pages;
using NUnit.Framework;
using Should;

namespace FunctionalTests.Web.Tests
{
    public class CalculatorPageTests
    {
        [TestFixture]
        public class When_landing_on_the_page : FunctionalTestBase
        {
            [Test]
            public void Should_show_a_zero_value()
            {
                RunTest(browser =>
                {
                    var page = new CalculatorPage(browser);
                    page.Visit();

                    var displayedValue = browser.FindId("display-value").InnerHTML;

                    displayedValue.ShouldEqual("0");
                });
            }
        }
    }
}
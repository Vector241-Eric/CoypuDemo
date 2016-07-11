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
                    page.GetDisplayValue().ShouldEqual("0");
                });
            }
        }

        [TestFixture]
        public class When_adding_two_numbers : FunctionalTestBase
        {
            [Test]
            public void Should_display_the_addition_result()
            {
                RunTest(browser =>
                {
                    var page = new CalculatorPage(browser);

                    page.Visit();
                    page.Enter("111");
                    page.Enter("+");
                    page.Enter("222");
                    page.Enter("=");

                    page.GetDisplayValue().ShouldEqual("3334");
                });
            }
        }
    }
}
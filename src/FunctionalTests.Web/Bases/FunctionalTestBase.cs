using System;
using Coypu;
using Coypu.Drivers;
using Coypu.Drivers.Selenium;
using NUnit.Framework;

namespace FunctionalTests.Web.Bases
{
    public abstract class FunctionalTestBase
    {
        protected FunctionalTestBase()
        {
            CleanupBrowser = true;
        }

        private BrowserSession GetBrowserSession()
        {
            var configuration = new SessionConfiguration
            {
                Driver = typeof (SeleniumWebDriver),
                Browser = Browser.Chrome,
            };

            var browser = new BrowserSession(configuration);
            browser.MaximiseWindow();
            return browser;
        }

        protected bool CleanupBrowser { get; set; }

        protected void RunTest(Action<BrowserSession> test)
        {
            if (CleanupBrowser)
            {
                using (var browser = GetBrowserSession())
                {
                    test(browser);
                }
            }

            //Skip the using statement so we don't dispose of the browser
            else
            {
                test(GetBrowserSession());
            }
        }

        [OneTimeSetUp]
        public void TestFixtureSetUp()
        {
        }
    }
}
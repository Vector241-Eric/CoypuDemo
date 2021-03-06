﻿using System;
using System.Text.RegularExpressions;
using Coypu;
using FunctionalTests.Web.Extensions;

namespace FunctionalTests.Web.Pages
{
    public abstract class PageBase<TPage> where TPage : PageBase<TPage>
    {
        protected BrowserSession Browser { get; }


        protected PageBase(BrowserSession browser)
        {
            Browser = browser;
        }

        protected abstract string RelativeUrl { get; }
        protected virtual string LocationVerificationUrl => RelativeUrl;

        /// <summary>
        /// Verify that identifying page elements are displayed on the page
        /// </summary>
        protected abstract bool HasIdentifyingElements();

        private string NavigateUrl => RelativeUrl.ForBaseUrl(Configuration.SiteRootUrl);

        public TPage Visit()
        {
            Browser.Visit(NavigateUrl);
            var expectedUrl = LocationVerificationUrl.ForBaseUrl(Configuration.SiteRootUrl).Replace(".", @"\.");
            var currentLocation = Browser.Location.ToString();

            if (!Regex.IsMatch(currentLocation, expectedUrl))
            {
                Fail(
                    $"Expected to find the browser at [{expectedUrl}], but the current location is [{currentLocation}]");
            }

            if (!HasIdentifyingElements())
            {
                Fail("Could not locate the identifying page elements on the page.");
            }

            return (TPage) this;
        }

        protected void Fail(string message)
        {
            throw new Exception($"The {this.GetType().Name} failed with message: {message}");
        }
    }
}
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { EmergencyDisclaimerBanner } from './components/EmergencyDisclaimerBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { BreastHealthPage } from './pages/BreastHealthPage';
import { WarningSignsPage } from './pages/WarningSignsPage';
import { ScreeningPage } from './pages/ScreeningPage';
import { RiskFactorsPage } from './pages/RiskFactorsPage';
import { LearnPage } from './pages/LearnPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { AskPinkCarePage } from './pages/AskPinkCarePage';
import { FindCarePage } from './pages/FindCarePage';
import { FacilityDetailPage } from './pages/FacilityDetailPage';
import { AppointmentGuidePage } from './pages/AppointmentGuidePage';
import { FaqPage } from './pages/FaqPage';
import { SourcesPage } from './pages/SourcesPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { ContactPage } from './pages/ContactPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#FFF8FB] text-[#25202A] selection:bg-[#FCE7F3] selection:text-[#E83E8C]">
          {/* Top Medical Safety Disclaimer Bar */}
          <EmergencyDisclaimerBanner />

          {/* Primary Top Bar Navigation */}
          <Navbar />

          {/* Page Routing */}
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/about/sources" element={<SourcesPage />} />
              <Route path="/breast-health" element={<BreastHealthPage />} />
              <Route path="/warning-signs" element={<WarningSignsPage />} />
              <Route path="/screening" element={<ScreeningPage />} />
              <Route path="/risk-factors" element={<RiskFactorsPage />} />
              <Route path="/learn" element={<LearnPage />} />
              <Route path="/learn/:slug" element={<ArticleDetailPage />} />
              <Route path="/ask-pinkcare" element={<AskPinkCarePage />} />
              <Route path="/find-care" element={<FindCarePage />} />
              <Route path="/find-care/:slug" element={<FacilityDetailPage />} />
              <Route path="/appointment-guide" element={<AppointmentGuidePage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/accessibility" element={<AccessibilityPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Admin Portal Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/facilities" element={<AdminDashboardPage />} />
              <Route path="/admin/articles" element={<AdminDashboardPage />} />
              <Route path="/admin/sources" element={<SourcesPage />} />
              <Route path="/admin/users" element={<AdminDashboardPage />} />
              <Route path="/admin/audit-logs" element={<AdminDashboardPage />} />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Accessible Footer with Disclaimers & Sourcing */}
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

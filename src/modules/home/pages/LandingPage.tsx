'use client';
import { useDisclosure } from '@mantine/hooks';

import {
  FaqModal,
  FeaturesSection,
  HeroSection,
  HowItWorksSection,
  LandingFooter,
  LandingNavbar,
  PrivacyModal,
} from '../components';

export function LandingPage() {
  const [privacyOpened, { open: openPrivacy, close: closePrivacy }] = useDisclosure(false);
  const [faqOpened, { open: openFaq, close: closeFaq }] = useDisclosure(false);

  return (
    <>
      <PrivacyModal opened={privacyOpened} onClose={closePrivacy} />
      <FaqModal opened={faqOpened} onClose={closeFaq} />
      <LandingNavbar onPrivacyOpen={openPrivacy} onFaqOpen={openFaq} />
      <main id="main-content">
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        {/* PrivacySection removed — now in modal */}
        {/* FaqSection removed — now in modal */}
        {/* TemplateShowcaseSection removed */}
        {/* FinalCtaSection removed */}
      </main>
      <LandingFooter />
    </>
  );
}
